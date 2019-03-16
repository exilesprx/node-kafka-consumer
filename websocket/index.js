const WebSocket = require('ws');
const winston = require('../logger');
const emitter = require('../events/emitter');
const wss = new WebSocket.Server(
    {
        port: process.env.WEB_SOCKET_PORT
    }
);

wss.on('connection', (client) => {
    winston.log(
        {
            level: 'info',
            message: "Websocket connection now open."
        }
    );

    client.on('message', (msg) => {

        let data = JSON.parse(msg);
        let event = data.event;
        let room = data.room;

        if (event == 'join') {
            emitter.emit('join', room, client);
        }

        if (event == 'leave') {
            emitter.emit('leave', room, client)
        }
    });
});

module.exports = wss;