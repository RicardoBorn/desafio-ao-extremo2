const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const simulatorDir = path.join(__dirname, 'public', 'simulator');

const images = [
    { name: 'target.png', quality: 85 },
    { name: 'knife.png', quality: 90 },
    { name: 'accept-mission.png', quality: 90 },
    { name: 'mission-complete.png', quality: 90 }
];

async function optimizeImages() {
    console.log('🎯 Optimizing simulator images...\n');

    for (const img of images) {
        const inputPath = path.join(simulatorDir, img.name);
        const backupPath = path.join(simulatorDir, `${img.name}.backup`);

        // Create backup
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(inputPath, backupPath);
            console.log(`✅ Backup created: ${img.name}.backup`);
        }

        const inputStats = fs.statSync(inputPath);
        const inputSize = (inputStats.size / 1024).toFixed(2);

        // Optimize
        await sharp(inputPath)
            .png({ quality: img.quality, compressionLevel: 9 })
            .toFile(inputPath + '.tmp');

        // Replace original
        fs.renameSync(inputPath + '.tmp', inputPath);

        const outputStats = fs.statSync(inputPath);
        const outputSize = (outputStats.size / 1024).toFixed(2);
        const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

        console.log(`📦 ${img.name}: ${inputSize}KB → ${outputSize}KB (${reduction}% reduction)`);
    }

    console.log('\n✨ All images optimized successfully!');
}

optimizeImages().catch(console.error);
