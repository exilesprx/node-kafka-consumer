require('dotenv').config();

const WebSocket = require('ws');
const wss = require('./websocket/index');
const emitter = require('./events/emitter');
const winston = require('./logger');
const consumer = require('./consumer/index');

emitter.on('UserCreated', (data) => {

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
});