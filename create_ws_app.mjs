#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cp } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function cloneApp() {
    try {
        const sourceDir = join(__dirname, 'app');
        const targetDir = process.cwd();
        
        await cp(sourceDir, targetDir, { recursive: true });
        console.log('Successfully cloned app directory to:', targetDir);
    } catch (error) {
        console.error('Error cloning app directory:', error);
        process.exit(1);
    }
}

cloneApp();
