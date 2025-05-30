#!/usr/bin/env node

import fs from 'fs-extra';
import chalk from 'chalk';
import { startServer } from './src/server/index.js';
import { buildStaticSite } from './src/build/static-site.js';

const appDirectory = fs.realpathSync(process.cwd());
const args = process.argv.slice(2);

process.on('SIGINT', () => {
    console.log(chalk.red('\nStopping server...'));
    process.exit();
});

const timerArg = args.find(arg => arg.startsWith('--timer='));

if (args.includes('--build')) {
    buildStaticSite(appDirectory);
} else if (timerArg) {
    const timerValue = parseInt(timerArg.split('=')[1]);
    startServer(appDirectory);
    setTimeout(() => {
        console.log(chalk.red('Stopping server...\n time is up'));
        process.exit();
    }, timerValue * 60000);
} else if (args.includes('--start')) {
    startServer(appDirectory);
} else {
    console.log(chalk.red('What do you need?'));
    console.log('Use --start to start the server\n');
    console.log('Use --timer=minutes to start the server will stop after the minutes are up\n');
    console.log('Use --build to generate static site files');
}