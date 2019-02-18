require('dotenv').config();

const kafka = require('kafka-node');

const client = new kafka.KafkaClient(
    {
        kafkaHost: ""
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