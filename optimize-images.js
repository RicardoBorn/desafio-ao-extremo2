const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Imagens para otimizar
const imagesToOptimize = [
    'logo.png',
    'participant-1.png',
    'participant-2.png',
    'participant-3.png',
    'participant-4.png',
    'participant-5.png',
    'participant-6.png',
    'participant-7.png',
    'participant-8.png',
    'participant-9.png',
    'texture.png'
];

async function optimizeImages() {
    console.log('🎨 Iniciando otimização de imagens...\n');

    for (const imageName of imagesToOptimize) {
        const inputPath = path.join(publicDir, imageName);
        const outputPath = path.join(publicDir, `optimized-${imageName}`);

        try {
            const inputStats = fs.statSync(inputPath);
            const inputSizeKB = (inputStats.size / 1024).toFixed(2);

            await sharp(inputPath)
                .png({ quality: 80, compressionLevel: 9 })
                .toFile(outputPath);

            const outputStats = fs.statSync(outputPath);
            const outputSizeKB = (outputStats.size / 1024).toFixed(2);
            const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

            console.log(`✅ ${imageName}`);
            console.log(`   Antes: ${inputSizeKB} KB`);
            console.log(`   Depois: ${outputSizeKB} KB`);
            console.log(`   Redução: ${reduction}%\n`);

            // Substituir arquivo original pelo otimizado
            fs.unlinkSync(inputPath);
            fs.renameSync(outputPath, inputPath);

        } catch (error) {
            console.error(`❌ Erro ao otimizar ${imageName}:`, error.message);
        }
    }

    console.log('🎉 Otimização concluída!');
}

optimizeImages();
