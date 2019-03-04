const WebSocket = require('ws');
const winston = require('../logger');
const wss = new WebSocket.Server(
    {
        port: process.env.WEB_SOCKET_PORT
    }
);

wss.on('connection', () => {
    winston.log(
        {
            level: "info",
            message: "A socket connected"
        }
    );
});

module.exports = wss;