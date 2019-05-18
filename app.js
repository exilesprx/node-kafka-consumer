require('dotenv').config();

const WebSocket = require('ws');
const wss = require('./websocket/index');
const emitter = require('./events/emitter');
const winston = require('./logger');
const consumer = require('./consumer/index');
const rooms = require('./rooms/index');

let onRoomMessage = (room, data) => {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN && client.rooms != undefined && client.rooms.indexOf(room) > -1) {
            client.send(JSON.stringify(data));
        }
    });
}

emitter.on('room.message', onRoomMessage);