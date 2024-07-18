#!/usr/bin/env node

import os from 'os';
import express from 'express';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

const app = express();
const port = 3000;
const appDirectory = fs.realpathSync(process.cwd());
const args = process.argv.slice(2);

async function configureRoutes() {
    try {
        const routesData = await fs.readFile(path.join(appDirectory, 'routes.json'), 'utf-8');
        const routes = JSON.parse(routesData);

        routes.forEach(route => {
            if (route.route && route.path && route.path.endsWith('.html') && route.route.startsWith('/')) {
                app.get(route.route, (req, res) => {
                    res.sendFile(path.join(appDirectory, 'public', route.path));
                });
            }
        });

        console.log(chalk.green('Routes setup complete.'));
    } catch (error) {
        console.error(chalk.red('Error setting up routes:', error));
    }
}

function startServer() {
    const cpus = os.cpus();
    const arch = os.arch();
    const freeMemoryBytes = os.freemem();
    const freeMemoryGB = freeMemoryBytes / (1024 ** 3);

    console.log(chalk.green('Starting...'));
    console.log('\n');
    console.log(chalk.yellow(`CPU`));
    console.log(chalk.red(`CPU Model: ${cpus[0].model}`));
    console.log(chalk.red(`CPU Architecture: ${arch}`));
    console.log('\n');
    console.log(chalk.yellow(`RAM`));
    console.log(chalk.blue(`Available RAM: ${freeMemoryGB.toFixed(2)} GB`));
    console.log('\n');
    console.log(chalk.blue("Starting Web Server..."));

    app.use(express.json());
    app.listen(port, () => {
        configureRoutes();
        console.log(chalk.green("CTRL + CLICK To follow link"));
        console.log(chalk.green(`http://localhost:${port}`));
    });
}

process.on('SIGINT', () => {
    console.log(chalk.red('\nStopping server...'));
    process.exit();
});

const timerArg = args.find(arg => arg.startsWith('--timer='));

if (timerArg) {
    const timerValue = parseInt(timerArg.split('=')[1]);
    startServer();
    setTimeout(() => {
        console.log(chalk.red('Stopping server...\n time is up'));

        process.exit();
    }, timerValue * 60000);
} else if (args.includes('--start')) {
    startServer();
} else {
    console.log(chalk.red('What do you need?'));
    console.log('Use --start to start the server\n');
    console.log('Use --timer=minutes to start the server will stop after the minutes are up')
}