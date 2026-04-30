import promisePool from "./src/database";
import "dotenv/config";

async function debug() {
    try {
        const [rows] = await promisePool.query("SELECT username, token, atk FROM users LIMIT 10");
        console.log("USER_LIST:", JSON.stringify(rows));
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

debug();
