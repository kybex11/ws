import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function configureRoutes(appDirectory, app) {
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