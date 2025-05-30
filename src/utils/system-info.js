import os from 'os';
import chalk from 'chalk';

export function logSystemInfo() {
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
} 