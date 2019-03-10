const kafka = require('kafka-node');
const uuid4 = require('uuid/v4');
const winston = require('../logger');
const emitter = require('../events/emitter');

const host = process.env.KAFKA_HOST;
const port = process.env.KAFKA_PORT;
const queue = process.env.KAFKA_QUEUE;

const consumer = new kafka.ConsumerGroup(
    {
        kafkaHost: `${host}:${port}`,
        groupId: uuid4(),
        fromOffset: 'latest'
    },
    [
        queue
    ]
);

consumer.on('message', function(message) {
    
    let value = JSON.parse(message.value);
    let event = value.properties.event;
    let body = JSON.parse(value.body);
    
    emitter.emit(event, body);
});

consumer.on('error', function(error) {
    winston.log(
        {
            level: 'error',
            message: error
        }
    );
});

module.exports = consumer;