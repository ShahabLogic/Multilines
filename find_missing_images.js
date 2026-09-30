const fs = require('fs');
const path = require('path');

const publicDir = 'c:\\Users\\Macbook\\Desktop\\floors-like-glass-main\\public';
const servicesDir = 'src\\pages\\services';

// Find all bg image URLs from all generated service components
const allFiles = fs.readdirSync(servicesDir).filter(f => f.endsWith('.js'));
const missingImages = new Set();

allFiles.forEach(file => {
    const content = fs.readFileSync(path.join(servicesDir, file), 'utf-8');
    const bgMatches = content.matchAll(/background-image:url\("(\/wp-content\/uploads\/[^"]+)"\)/g);
    for (const m of bgMatches) {
        const imgPath = m[1];
        const localPath = path.join(publicDir, imgPath);
        if (!fs.existsSync(localPath)) {
            missingImages.add(imgPath);
        }
    }
    // Also check src= attributes for img tags
    const srcMatches = content.matchAll(/\bsrc="(\/wp-content\/uploads\/[^"]+)"/g);
    for (const m of srcMatches) {
        const imgPath = m[1];
        const localPath = path.join(publicDir, imgPath);
        if (!fs.existsSync(localPath)) {
            missingImages.add(imgPath);
        }
    }
});

console.log('Missing images:');
[...missingImages].forEach(img => console.log(img));
console.log('\nTotal missing:', missingImages.size);

// Write list to file for download script
fs.writeFileSync('missing_images.json', JSON.stringify([...missingImages], null, 2));
