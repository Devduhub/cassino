const mysql = require('mysql2/promise');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: '.env' });

async function getLaunchUrl() {
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
            console.log('No agents found in database. Cannot generate launch URL.');
            process.exit(1);
        }
        
        const agent = rows[0];
        console.log(`Using agent: ${agent.agentToken}`);

        const payload = {
            agentToken: agent.agentToken,
            secretKey: agent.secretKey,
            user_code: 'testuser123',
            user_balance: 150.00,
            game_type: 'slot',
            provider_code: 'PGSOFT',
            game_code: 'fortune-tiger'
        };

        const response = await axios.post('http://localhost:3000/api/v1/game_launch', payload);
        
        console.log('\n--- GAME LAUNCH RESPONSE ---');
        console.log(response.data);
        console.log('----------------------------\n');
        
        if (response.data && response.data.launch_url) {
            console.log('🚀 FORTUNE TIGER LAUNCH URL:');
            console.log(response.data.launch_url);
            
            // Grava a URL em um arquivo para o usuário acessar facilmente
            fs.writeFileSync('fortune_tiger_link.txt', response.data.launch_url);
        } else {
            console.log('Failed to get launch URL.');
        }

        process.exit(0);
    } catch (e) {
        console.error('Error:', e.response ? e.response.data : e.message);
        process.exit(1);
    }
}

getLaunchUrl();
