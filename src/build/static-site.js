import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export async function buildStaticSite(appDirectory) {
    try {
        console.log(chalk.blue('Building static site...'));
        
        // Create dist directory if it doesn't exist
        const distDir = path.join(appDirectory, 'dist');
        await fs.ensureDir(distDir);
        
        // Read routes configuration
        const routesData = await fs.readFile(path.join(appDirectory, 'routes.json'), 'utf-8');
        const routes = JSON.parse(routesData);
        
        // Copy all public files to dist
        await fs.copy(path.join(appDirectory, 'public'), distDir);
        
        // Process each route
        for (const route of routes) {
            if (route.route && route.path && route.path.endsWith('.html') && route.route.startsWith('/')) {
                const sourcePath = path.join(appDirectory, 'public', route.path);
                const targetPath = path.join(distDir, route.path);
                
                // Ensure the target directory exists
                await fs.ensureDir(path.dirname(targetPath));
                
                // Copy the file
                await fs.copyFile(sourcePath, targetPath);
                
                console.log(chalk.green(`Processed: ${route.path}`));
            }
        }
        
        console.log(chalk.green('Static site build complete!'));
        console.log(chalk.blue(`Files are available in the ${distDir} directory`));
    } catch (error) {
        console.error(chalk.red('Error building static site:', error));
    }
} 