const kafka = require('kafka-node');
const winston = require('../logger');

const host = process.env.KAFKA_HOST;
const port = process.env.KAFKA_PORT;

const client = new kafka.KafkaClient(
    {
        kafkaHost: `${host}:${port}`,
        groupId: '5c5f088ede2e46.85073015'
    }
);

const consumer = new kafka.Consumer(
    client,
    [
        { topic: 'user.created', partition: 0 }
    ],
    {
        autoCommit: false
    }
);

consumer.on('error', function(error) {
    winston.log(
        {
            level: 'error',
            message: `Error message: ${error}`
        }
    );
});

client.on('connect', function() {
    winston.log(
        {
            level: 'info',
            message: 'Connection occured'
        }
    );
});

client.on('ready', function() {
    winston.log(
        {
            level: 'info',
            message: 'Brokers are ready'
        }
    );
});

module.exports = consumer;