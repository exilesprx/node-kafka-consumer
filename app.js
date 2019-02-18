require('dotenv').config();

const kafka = require('kafka-node');

const host = process.env.KAFKA_HOST;
const port = process.env.KAFKA_PORT;

const client = new kafka.KafkaClient(
    {
        kafkaHost: `${host}:${port}`
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

const messageEvent = function(message) {
    console.log(message);
}

consumer.on('message', messageEvent);