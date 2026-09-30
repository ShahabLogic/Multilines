const fs = require('fs');
const content = fs.readFileSync('src/pages/services/EpoxyFlooringService.js', 'utf-8');

// Find all href paths from link tags
const hrefMatches = Array.from(content.matchAll(/href="([^"]+)"/g)).map(m => m[1]).slice(0, 25);
console.log('CSS Href paths:', JSON.stringify(hrefMatches, null, 2));

// Check if any img srcs exist
const imgMatches = Array.from(content.matchAll(/src="([^"]+\.(?:jpg|jpeg|png|webp|gif))"/gi)).map(m => m[1]).slice(0, 10);
console.log('\nImage src paths:', JSON.stringify(imgMatches, null, 2));

// Check data-settings for background images
const bgMatches = Array.from(content.matchAll(/background-image:url\("([^"]+)"\)/g)).map(m => m[1]).slice(0, 10);
console.log('\nBackground image paths:', JSON.stringify(bgMatches, null, 2));
