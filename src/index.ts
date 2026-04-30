import express, { Request, Response } from "express"
import helmet from "helmet"
import cors from "cors"
import fs from "fs"
import https from "https"
import http from "http"
import logger from "./logger/index"
import routes from "./routes"
import * as figlet from "figlet"
import path from "path"
import { Server, Socket } from "socket.io"
import session from 'express-session';

import allfunctions from "./functions/allfunctions"
import { emitirEventoInterno, adicionarListener } from "./serverEvents"
import "dotenv/config"

const app = express()
const httserver = http.createServer(app)
let httpserver: https.Server | undefined;
let io: Server;

try {
   const privateKey = fs.readFileSync("server.key", "utf8")
   const certificate = fs.readFileSync("server.crt", "utf8")
   const credentials = {
      key: privateKey,
      cert: certificate,
   }
   httpserver = https.createServer(credentials, app)
   io = new Server(httpserver)
} catch (e) {
   console.warn("Certificates not found, starting Socket.IO on HTTP server only.");
   io = new Server(httserver)
}

console.log(figlet.textSync("API DE JOGOS JOHN"), "\n")

declare module "express-serve-static-core" {
   interface Request {
      io: Server
   }
}
const users = new Map<string, any>()

declare module "express-session" {
   export interface SessionData {
      steps: any
   }
}

io.on("connection", async (socket: Socket) => {
   console.log(`[SOCKET] New connection attempt: ${socket.id}`);

   socket.on("client_log", (data) => {
      console.log(`[CLIENT LOG - ${socket.id}]`, JSON.stringify(data));
   });

   socket.on("join", async (socket1) => {
      console.log(`[SOCKET] Join event received from ${socket.id}:`, JSON.stringify(socket1));
      const token: any = socket1.token
      console.log(`[SOCKET] Joining Game ${socket1.gameId} for token: ${token}`);

      const userResult = await allfunctions.getuserbytoken(token);
      if (userResult && userResult[0]) {
         users.set(socket.id, {
            token: token,
            username: userResult[0].username,
            bet: 0,
            saldo: userResult[0].saldo,
            rtp: userResult[0].rtp,
            agentid: userResult[0].agentid,
            socketid: socket.id,
            gamecode: socket1.gameId,
            aw: 0,
            atk: userResult[0].atk
         });
         console.log(`[SOCKET] User ${userResult[0].username} joined and tracked.`);
      } else {
         console.log(`[SOCKET] User NOT found for token: ${token}. Disconnecting.`);
         socket.disconnect(true);
         return;
      }

      const intervalId = setInterval(async function () {
         const user = await allfunctions.getuserbytoken(token)

         if (!user[0]) {
            socket.disconnect(true)
            clearInterval(intervalId)
            return false
         }

         const retornado = user[0].valorganho || 0
         const valorapostado = user[0].valorapostado || 0

         let rtp = 0;
         if (valorapostado > 0) {
            rtp = Math.round((retornado / valorapostado) * 100)
         }

         if (!isNaN(rtp) && isFinite(rtp)) {
            await allfunctions.updatertp(user[0].atk, rtp)
         }
      }, 10000)

      socket.on("disconnect", () => {
         clearInterval(intervalId)
         users.delete(socket.id)
         console.log(`[SOCKET] Cliente desconectado: ${socket.id}`);
      })
   })
})

adicionarListener("attganho", async (dados) => {
   users.forEach(async (valor, socketid) => {
      if (valor.atk === dados.atk) {
         let currentAw = parseFloat(valor.aw) || 0;
         let newAw = currentAw + (dados.aw || 0);
         valor.aw = newAw;

         io.to(socketid).emit("awreceive", {
            aw: newAw,
         })
      }
   })
})

adicionarListener("att", (dados) => {
   users.forEach((valor, socketid) => {
      if (valor.token === dados.token) {
         valor.saldo = dados.saldo;
         valor.bet = dados.bet;
         valor.rtp = dados.rtp;
      }
   })
})

app.use(cors({ credentials: true }))
app.use((req, res, next) => {
   const start = Date.now();
   res.on('finish', () => {
      const duration = Date.now() - start;
      const logMsg = `[FILE_LOG] ${new Date().toISOString()} ${req.method} ${req.url} - Status: ${res.statusCode} (${duration}ms)\n`;
      fs.appendFileSync(path.join(__dirname, '../logs_debug.txt'), logMsg);
   });
   next();
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware para logar todas as requisições e tratar headers do SW
app.use((req: Request, res: Response, next) => {
   /*const skipExt = ['.png', '.jpg', '.webp', '.mp3', '.ogg', '.wasm', '.ttf', '.woff'];
   const shouldSkip = skipExt.some(ext => req.url.endsWith(ext));
   if (!shouldSkip) {
      console.log(`[REQUEST] ${req.method} ${req.url}`);
   }*/
   console.log(`[REQUEST] ${req.method} ${req.url}`);

   if (req.url.includes("sw.js")) {
      res.setHeader("Service-Worker-Allowed", "/");
   }

   req.io = io // Adiciona o socket.io ao objeto req
   next()
})

// Rota raiz - responde imediatamente sem travar
app.get("/", (req: Request, res: Response) => {
   res.json({ status: "ok", message: "API rodando!" })
})

app.use("/", express.static(path.join(__dirname, "public"), {
   setHeaders: (res, path) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      if (path.endsWith('.json')) {
         res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      if (path.endsWith('.js')) {
         res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      }
   }
}))

app.use("/status", (req, res) => {
   res.json({ status: "operational", time: new Date().toISOString() })
})
app.use("/ping", (req, res) => {
   res.send("pong")
})
app.use(routes)

if (httpserver) {
   httpserver.listen(443, () => {
      logger.info("SERVIDOR INICIADO JOHNGAMES HTTPS " + 443)
   })
}
httserver.listen(process.env.PORT, () => {
   logger.info("SERVIDOR INICIADO JOHNGAMES " + process.env.PORT)
})