import express from 'express';
import chalk from 'chalk';
import path from 'path';
import { logSystemInfo } from '../utils/system-info.js';
import { setupWebSocketServer } from './websocket.js';
import { setupFileWatcher } from './watcher.js';
import { configureRoutes } from './routes.js';

export function startServer(appDirectory, port = 3000) {
    const app = express();

    // Serve static files with correct MIME types
    app.use(express.static(path.join(appDirectory, 'public'), {
        setHeaders: (res, path) => {
            if (path.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
            }
        }
    }));

    logSystemInfo();
    console.log(chalk.blue("Starting Web Server..."));

    app.use(express.json());
    const server = app.listen(port, () => {
        configureRoutes(appDirectory, app);
        setupWebSocketServer(server);
        setupFileWatcher(appDirectory);
        console.log(chalk.green("CTRL + CLICK To follow link"));
        console.log(chalk.green(`http://localhost:${port}`));
    });

    return server;
} 