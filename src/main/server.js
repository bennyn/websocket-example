const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = parseInt(process.env.PORT, 10) || 8087;

const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocket.Server({server: httpServer});

wsServer.on('listening', () => console.log(`WebSocket server listening on port "${PORT}"...`));
wsServer.on('message', () => console.log(`Message received: ${message}`));
wsServer.on('connection', (ws) => {
  ws.on('message', (message) => wsServer.clients.forEach((client) => client.send(`Echo: ${message}`)));
});

httpServer.listen(PORT, () => {
  console.log(`HTTP server listening on port "${httpServer.address().port}"...`);
});
