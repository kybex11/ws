import { WebSocketServer } from 'ws';
import chalk from 'chalk';

let wss = null;

export function setupWebSocketServer(server) {
    wss = new WebSocketServer({ server });
    
    wss.on('connection', (ws) => {
        console.log(chalk.blue('Client connected for live reload'));
        
        ws.on('close', () => {
            console.log(chalk.blue('Client disconnected'));
        });
    });
}

export function notifyClientsToReload() {
    if (wss) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('reload');
            }
        });
    }
} 