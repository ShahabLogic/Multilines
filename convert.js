const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\My Web Sites\\final';
const destDir = 'c:\\Users\\Macbook\\Desktop\\floors-like-glass-main\\src\\pages';

const skipDirs = ['assets', 'wp-content', 'wp-includes', 'wp-json', 'blog', 'category', 'projects'];
// Conflicting pages mapping
const renameMap = {
    'about-us': 'AboutNew',
    'contact-us': 'ContactNew',
    'service': 'ServicesNew'
};

function toPascalCase(str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

const dirs = fs.readdirSync(srcDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !skipDirs.includes(dirent.name));

const components = [];

dirs.forEach(dirent => {
    const dirName = dirent.name;
    const indexPath = path.join(srcDir, dirName, 'index.html');
    if (fs.existsSync(indexPath)) {
        let htmlContent = fs.readFileSync(indexPath, 'utf-8');
        
        // Extract head content for styles
        const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
        let headStyles = '';
        if (headMatch) {
            const headInner = headMatch[1];
            const allLinks = headInner.match(/<link[^>]+>/gi) || [];
            const stylesheets = allLinks.filter(link => /rel=['"]?stylesheet['"]?/i.test(link));
            const styleBlocks = headInner.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
            headStyles = [...stylesheets, ...styleBlocks].join('\n');
            
            // Fix asset paths in the head styles
            headStyles = headStyles.replace(/\.\.\/wp-content/g, '/wp-content');
            headStyles = headStyles.replace(/\.\.\/wp-includes/g, '/wp-includes');
            headStyles = headStyles.replace(/\.\.\/assets/g, '/assets');
        }

        // Extract body content
        const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatch) {
            let bodyInner = bodyMatch[1];
            
            // Fix asset paths (e.g., ../wp-content to /wp-content)
            bodyInner = bodyInner.replace(/\.\.\/wp-content/g, '/wp-content');
            bodyInner = bodyInner.replace(/\.\.\/wp-includes/g, '/wp-includes');
            bodyInner = bodyInner.replace(/\.\.\/assets/g, '/assets');
            
            // Remove hardcoded header and footer
            bodyInner = bodyInner.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
            bodyInner = bodyInner.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
            
            // Determine component name
            let componentName = renameMap[dirName] || toPascalCase(dirName);
            
            // Combine styles and body
            let fullContent = headStyles + '\n' + bodyInner;

            // Escape backticks and ${}
            let escapedHtml = fullContent.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
            
            const jsContent = `
import React from 'react';

const ${componentName} = () => {
    return (
        <div dangerouslySetInnerHTML={{ __html: \`${escapedHtml}\` }} />
    );
};

export default ${componentName};
`;
            
            fs.writeFileSync(path.join(destDir, `${componentName}.js`), jsContent.trim());
            components.push({ path: dirName, component: componentName });
            console.log(`Generated ${componentName}.js`);
        }
    }
});

fs.writeFileSync(path.join(__dirname, 'componentsList.json'), JSON.stringify(components, null, 2));
console.log("Done.");
