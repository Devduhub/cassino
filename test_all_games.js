const mysql = require('mysql2/promise');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env' });

const games = [
    'fortune-tiger',
    'fortune-ox',
    'fortune-mouse',
    'fortune-dragon',
    'fortune-rabbit',
    'bikini-paradise',
    'jungle-delight',
    'ganesha-gold',
    'double-fortune',
    'dragon-tiger-luck'
];

async function generateAllLaunchUrls() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USERNAME || 'root',
            database: process.env.DB_NAME || 'pgsoft',
            password: process.env.DB_PASSWORD || '',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        const [rows] = await pool.query('SELECT * FROM agents LIMIT 1');
        if (rows.length === 0) {
            console.log('No agents found in database. Cannot generate launch URLs.');
            process.exit(1);
        }
        
        const agent = rows[0];
        console.log(`Using agent: ${agent.agentToken}`);

        let allLinks = '';

        for (const game_code of games) {
            const payload = {
                agentToken: agent.agentToken,
                secretKey: agent.secretKey,
                user_code: 'testuser_all',
                user_balance: 1000.00,
                game_type: 'slot',
                provider_code: 'PGSOFT',
                game_code: game_code
            };

            try {
                const response = await axios.post(`http://localhost:${process.env.PORT || 3000}/api/v1/game_launch`, payload);
                if (response.data && response.data.launch_url) {
                    console.log(`✅ Generated URL for ${game_code}`);
                    // O backend já retorna a URL formatada corretamente (m.pgsoft.com:3000...)
                    allLinks += `${game_code.toUpperCase()}:\n${response.data.launch_url}\n\n`;
                } else {
                    console.log(`❌ Failed to generate URL for ${game_code}: ${JSON.stringify(response.data)}`);
                }
            } catch (err) {
                console.log(`❌ Error generating URL for ${game_code}: ${err.message}`);
            }
        }
        
        fs.writeFileSync('all_games_links.txt', allLinks);
        console.log('\n--- DONE ---');
        console.log('All links have been saved to all_games_links.txt');
        
        process.exit(0);
    } catch (e) {
        console.error('Error:', e.message);
        process.exit(1);
    }
}

generateAllLaunchUrls();
