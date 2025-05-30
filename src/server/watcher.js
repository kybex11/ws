import chokidar from 'chokidar';
import path from 'path';
import chalk from 'chalk';
import { configureRoutes } from './routes.js';
import { notifyClientsToReload } from './websocket.js';

export function setupFileWatcher(appDirectory) {
    const watcher = chokidar.watch(path.join(appDirectory, 'public'), {
        ignored: /(^|[\/\\])\../,
        persistent: true
    });

    watcher.on('change', async (path) => {
        console.log(chalk.yellow(`File ${path} has been changed`));
        await configureRoutes(appDirectory);
        notifyClientsToReload();
    });

    console.log(chalk.green('File watcher started'));
} 