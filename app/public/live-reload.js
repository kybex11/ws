// Live reload client
const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = (event) => {
    if (event.data === 'reload') {
        console.log('Reloading page...');
        window.location.reload();
    }
};

ws.onclose = () => {
    console.log('Live reload connection closed');
};

ws.onerror = (error) => {
    console.error('Live reload error:', error);
}; 