import promisePool from "../../database"
import { RowDataPacket, ResultSetHeader } from "mysql2"

export default {
   async getuserbytoken(token: string) {
      const res = await promisePool.query<RowDataPacket[]>(`SELECT * FROM users WHERE token= ?`, [token])
      return res[0]
   },
   async getuserbyatk(atk: string) {
      const res = await promisePool.query<RowDataPacket[]>(`SELECT * FROM users WHERE atk= ?`, [atk])
      return res[0]
   },
   async attsaldobyatk(atk: string, novosaldo: number) {
      const res = await promisePool.query<ResultSetHeader>(`UPDATE users SET saldo = '${novosaldo}' WHERE atk= '${atk}'`)
      return res[0]
   },

   async atualizarapostado(atk: string, bet: number) {
      const user = await this.getuserbyatk(atk)
      const apostado = user[0].valorapostado
      const novoapostado = apostado + bet

      const res = await promisePool.query<ResultSetHeader>(`UPDATE users SET valorapostado = '${novoapostado}' WHERE atk='${atk}'`)

      return res[0]
   },
   async atualizardebitado(atk: string, bet: number) {
      const user = await this.getuserbyatk(atk)
      const valordebitado = user[0].valordebitado
      const novordebitado = valordebitado + bet

      const res = await promisePool.query<ResultSetHeader>(`UPDATE users SET valordebitado = '${novordebitado}' WHERE atk='${atk}'`)

      return res[0]
   },
   async atualizarganho(atk: string, ganho: number) {
      const user = await this.getuserbyatk(atk)
      const valorganho = user[0].valorganho
      const novodeganho = valorganho + ganho

      const res = await promisePool.query<ResultSetHeader>(`UPDATE users SET valorganho = '${novodeganho}' WHERE atk='${atk}'`)

      return res[0]
   },
   async getcall(id: number) {
      const res = await promisePool.query<RowDataPacket[]>("SELECT * FROM calls WHERE iduser = ?", [id])
      return res[0]
   },
   async getcallbyid(id: number) {
      const res = await promisePool.query<RowDataPacket[]>("SELECT * FROM calls WHERE id = ?", [id])
      return res[0]
   },
   async completarcallid(id: number) {
      const newstatus = "completed"
      const res = await promisePool.query<ResultSetHeader>("UPDATE calls SET status = ? WHERE id = ?", [newstatus, id])
      return res[0]
   },
   async savejsonspin(id: number, json: any) {
      const res = await promisePool.query<ResultSetHeader>("UPDATE fortunerabbitplayerjson SET JSON = ? WHERE id = ?", [json, id])
      return res[0]
   },
   async getjsonrabbit(id: number) {
      const res = await promisePool.query<RowDataPacket[]>("SELECT * FROM fortunerabbitplayerjson WHERE id=?", [id])
      return res[0]
   },
   async createjsonrabbit(id: number) {
      const defaultJson = JSON.stringify({
         dt: {
            si: {
               wc: 31,
               ist: false,
               itw: true,
               fws: 0,
               wp: null,
               orl: [5, 6, 4, 3, 7, 2, 3, 0, 7],
               lw: null,
               irs: false,
               gwt: -1,
               fb: null,
               ctw: 0.0,
               pmt: null,
               cwc: 0,
               fstc: null,
               pcwc: 0,
               rwsp: null,
               hashr: "0:2;5;4#3;3;6#7;3;6#MV#3.0#MT#1#MG#0#",
               ml: 1,
               cs: 0.8,
               rl: [5, 6, 4, 3, 7, 2, 3, 0, 7],
               sid: "1758600495495052800",
               psid: "1758600495495052800",
               st: 1,
               nst: 1,
               pf: 1,
               aw: 0.0,
               wid: 0,
               wt: "C",
               wk: "0_C",
               wbn: null,
               wfg: null,
               blb: 0,
               blab: 0,
               bl: 0,
               tb: 0,
               tbb: 0,
               tw: 0.0,
               np: 0,
               ocr: null,
               mr: null,
               ge: [1, 11],
            },
         },
      })
      const res = await promisePool.query<ResultSetHeader>(
         "INSERT INTO fortunerabbitplayerjson (id, JSON) VALUES (?, ?)",
         [id, defaultJson],
      )

      return res[0]
   },
   async attawcall(id: number, valor: number) {
      const call = await this.getcallbyid(id)
      const aw = call[0].aw
      const newaw = aw + valor

      const res = await promisePool.query<ResultSetHeader>(`UPDATE calls SET aw = '${newaw}' WHERE id='${id}'`)

      return res[0]
   },
}
