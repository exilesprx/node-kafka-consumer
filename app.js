require('dotenv').config();

const winston = require('./logger');
const consumer = require('./consumer/index');
const WebSocket = require('ws');
const wss = require('./websocket/index');

consumer.on('message', function(message) {

    let value = JSON.parse(message.value);
    let properties = value.properties;

    winston.log(
        {
            level: 'info',
            message: `Message from kafka: ${properties}`
        }
    );

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            winston.log(
                {
                    level: 'info',
                    message: `Sending data to websocket`
                }
            )
            client.send(JSON.stringify(properties));
        }
    });
});