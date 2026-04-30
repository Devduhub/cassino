const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'src', 'controllers');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Fix the catch block missing res.send
            if (content.includes('catch (error) {') && content.includes('logger.error(error)') && !content.includes('res.status(500).send')) {
                content = content.replace(/catch \((error|e|err)\) \{\s*logger\.error\(\1\)\s*\}/g, 
                    'catch ($1: any) {\n         logger.error($1);\n         res.status(500).send({ err: "Internal Server Error", message: $1.message || $1 });\n      }');
                modified = true;
            }

            // Fix the missing user check in spin methods
            if (content.includes('const user = await ') && content.includes('user[0].saldo') && !content.includes('if (!user || user.length === 0)')) {
                // We'll just do a more targeted replace for spin if it starts with getting user
                const regexes = [
                    /(const user = await \w+\.getuserbyatk\(token\))/g
                ];
                let count = 0;
                content = content.replace(regexes[0], (match) => {
                    count++;
                    return `${match}\n         if (!user || user.length === 0) {\n            res.status(401).send({ err: "Invalid session" });\n            return;\n         }`;
                });
                if (count > 0) modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir(controllersDir);
