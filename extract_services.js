const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const srcDir = 'C:\\My Web Sites\\final\\service';
const destDir = 'c:\\Users\\Macbook\\Desktop\\floors-like-glass-main\\src\\pages\\services';
const publicUploads = 'c:\\Users\\Macbook\\Desktop\\floors-like-glass-main\\public\\wp-content\\uploads';
const liveBase = 'https://knoveo.co';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

function toPascalCase(str) {
    return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

/**
 * Fix a single asset path. Tries to find the cleanest local path from a
 * possibly duplicated scraped path, and returns the live URL as fallback
 * if the file doesn't exist locally.
 */
function resolveAssetPath(rawPath) {
    if (!rawPath) return rawPath;
    // Strip leading relative segments (../../ etc.)
    // Find the LAST occurrence of wp-content/wp-includes
    const lastWp = Math.max(rawPath.lastIndexOf('wp-content'), rawPath.lastIndexOf('wp-includes'));
    let cleanPath;
    if (lastWp !== -1) {
        cleanPath = '/' + rawPath.substring(lastWp).replace(/"+$/g, '');
    } else {
        cleanPath = rawPath;
    }

    // Check if this is an uploads path and if the file exists locally
    if (cleanPath.startsWith('/wp-content/uploads/')) {
        const localPath = path.join(publicUploads, cleanPath.replace('/wp-content/uploads/', ''));
        // URL-decode in case of spaces
        const decodedLocal = decodeURIComponent(localPath);
        if (fs.existsSync(localPath) || fs.existsSync(decodedLocal)) {
            return cleanPath;
        }
        // Not found locally – use live URL
        return liveBase + cleanPath;
    }

    return cleanPath;
}

function fixHtml(html) {
    if (!html) return html;
    // Fix all relative paths using resolveAssetPath
    let fixed = html.replace(/(?:\.\.\/)+(?:wp-content|wp-includes)[^\s"'`\)>]+/gi, (match) => {
        return resolveAssetPath(match);
    });
    // Fix stray trailing quotes on image extensions
    fixed = fixed.replace(/\.(png|jpg|jpeg|webp|gif|svg)"{2,}/gi, '.$1"');
    return fixed;
}

const components = [];
const dirs = fs.readdirSync(srcDir, { withFileTypes: true }).filter(d => d.isDirectory());

dirs.forEach(dirent => {
    const dirName = dirent.name;
    const indexPath = path.join(srcDir, dirName, 'index.html');
    if (!fs.existsSync(indexPath)) return;

    const htmlContent = fs.readFileSync(indexPath, 'utf-8');
    const $ = cheerio.load(htmlContent);

    // ── Build page title ──
    const title = $('h1.elementor-heading-title').first().text().trim()
        || $('h1').first().text().trim()
        || dirName.replace(/-/g, ' ');

    // ── Extract all paragraphs from content area (not header/footer) ──
    $('header').remove();
    $('footer').remove();
    const paragraphs = [];
    $('p').each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 40) paragraphs.push(text.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    });

    // ── Extract all heading+text sections (h2/h3 + next sibling p/div) ──
    const sections = [];
    $('h2, h3').each((_, el) => {
        const heading = $(el).text().trim();
        if (heading && heading.length > 3 && !heading.toLowerCase().includes('quick link') && !heading.toLowerCase().includes('newsletter')) {
            const nextText = $(el).next('p, div').text().trim();
            sections.push({ heading, text: nextText });
        }
    });

    // ── Extract images — background-image from inline styles ──
    const bgImages = new Set();
    // From <style> blocks in head
    const headStyle = $('head style').text();
    const headBgMatches = headStyle.matchAll(/background-image:url\("([^"]+)"\)/g);
    for (const m of headBgMatches) {
        const resolved = resolveAssetPath(m[1]);
        if (!resolved.includes('overlay') && !resolved.includes('Logo') && !resolved.includes('gradient')) {
            bgImages.add(resolved);
        }
    }
    // From inline style attributes in body
    $('[style]').each((_, el) => {
        const style = $(el).attr('style') || '';
        const m = style.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/i);
        if (m) bgImages.add(resolveAssetPath(m[1]));
    });

    // Also grab real <img> src attributes
    const imgSrcs = new Set();
    $('img').each((_, el) => {
        const src = $(el).attr('src') || '';
        if (src && !src.includes('data:image') && !src.includes('Logo') && src.length > 5) {
            imgSrcs.add(resolveAssetPath(src));
        }
    });

    // Combine into an images array (deduplicated, max 8)
    const allImages = [...new Set([...bgImages, ...imgSrcs])].filter(Boolean).slice(0, 8);

    const componentName = toPascalCase(dirName) + 'Service';
    const titleDisplay = title.replace(/['"]/g, '`');

    const sectionsJsx = sections.slice(0, 6).map(s => {
        const h = s.heading.replace(/['"<>]/g, ' ');
        const t = s.text.replace(/['"<>]/g, ' ');
        return `
            <div className="svc-section">
                <h3>${h}</h3>
                ${t ? `<p>${t}</p>` : ''}
            </div>`;
    }).join('');

    const imagesJsx = allImages.map((img, i) => {
        const safeImg = img.replace(/'/g, "\\'");
        return `
                <div key={${i}} className="svc-img-card">
                    <img src='${safeImg}' alt='${titleDisplay} ${i + 1}' />
                </div>`;
    }).join('');

    const parasJsx = paragraphs.slice(0, 4).map(p => `<p>${p}</p>`).join('\n                ');

    const jsContent = `import React from 'react';
import '../../styles/services.css';

const ${componentName} = () => {
    return (
        <div className="svc-page">
            <div className="svc-hero">
                <h1>${titleDisplay}</h1>
                <p className="svc-breadcrumb">Services &rsaquo; ${titleDisplay}</p>
            </div>

            <div className="svc-body">
                <div className="svc-intro">
                    ${parasJsx}
                </div>

                ${allImages.length > 0 ? `<div className="svc-gallery">
                    ${imagesJsx}
                </div>` : ''}

                <div className="svc-sections">
                    ${sectionsJsx}
                </div>
            </div>
        </div>
    );
};

export default ${componentName};
`;

    fs.writeFileSync(path.join(destDir, `${componentName}.js`), jsContent);
    components.push({ path: `services/${dirName}`, component: componentName, imageCount: allImages.length });
    console.log(`Generated ${componentName}.js — ${allImages.length} images, ${sections.length} sections`);
});

fs.writeFileSync('servicesComponentsList.json', JSON.stringify(components, null, 2));
console.log(`\nDone. Generated ${components.length} components.`);
