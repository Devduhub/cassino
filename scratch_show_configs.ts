import promisePool from "./src/database";
import "dotenv/config";

async function show() {
    try {
        console.log("--- AGENT CONFIGURATIONS ---");
        const [agents]: any = await promisePool.query("SELECT id, agentCode, probganho, probbonus, probganhortp FROM agents");
        console.table(agents);

        console.log("\n--- USER CONFIGURATIONS (Top 5) ---");
        const [users]: any = await promisePool.query("SELECT id, username, rtp, isinfluencer FROM users LIMIT 5");
        console.table(users);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

show();
