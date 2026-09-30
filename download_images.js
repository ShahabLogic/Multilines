const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const publicDir = 'c:\\Users\\Macbook\\Desktop\\floors-like-glass-main\\public';
const baseUrl = 'https://knoveo.co';
const missingImages = JSON.parse(fs.readFileSync('missing_images.json', 'utf-8'));

function download(imgPath) {
    return new Promise((resolve) => {
        const url = baseUrl + imgPath;
        // Decode any URL-encoded spaces
        const decodedPath = imgPath.replace(/%20/g, ' ');
        const localPath = path.join(publicDir, decodedPath);
        const localDir = path.dirname(localPath);

        if (fs.existsSync(localPath)) {
            console.log(`[SKIP] ${imgPath}`);
            return resolve();
        }

        if (!fs.existsSync(localDir)) {
            fs.mkdirSync(localDir, { recursive: true });
        }

        const file = fs.createWriteStream(localPath);
        const proto = url.startsWith('https') ? https : http;

        const request = proto.get(url, { timeout: 10000 }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                file.close();
                fs.unlinkSync(localPath);
                const redirectUrl = res.headers.location;
                const proto2 = redirectUrl.startsWith('https') ? https : http;
                const file2 = fs.createWriteStream(localPath);
                proto2.get(redirectUrl, (res2) => {
                    res2.pipe(file2);
                    file2.on('finish', () => { file2.close(); console.log(`[OK] ${imgPath}`); resolve(); });
                    file2.on('error', () => { fs.unlinkSync(localPath); console.log(`[ERR] ${imgPath}`); resolve(); });
                }).on('error', () => { console.log(`[ERR redirect] ${imgPath}`); resolve(); });
                return;
            }
            if (res.statusCode !== 200) {
                file.close();
                if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
                console.log(`[${res.statusCode}] ${imgPath}`);
                return resolve();
            }
            res.pipe(file);
            file.on('finish', () => { file.close(); console.log(`[OK] ${imgPath}`); resolve(); });
        });

        request.on('error', (err) => {
            file.close();
            if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
            console.log(`[ERR] ${imgPath}: ${err.message}`);
            resolve();
        });

        request.on('timeout', () => {
            request.destroy();
            file.close();
            if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
            console.log(`[TIMEOUT] ${imgPath}`);
            resolve();
        });
    });
}

async function main() {
    console.log(`Downloading ${missingImages.length} images from ${baseUrl}...\n`);
    // Download in batches of 5 to avoid rate limiting
    for (let i = 0; i < missingImages.length; i += 5) {
        const batch = missingImages.slice(i, i + 5);
        await Promise.all(batch.map(download));
    }
    console.log('\nAll done!');
}

main();
