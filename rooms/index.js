const emitter = require('../events/emitter');
let rooms = [];

emitter.on('join', (room, client) => {

    if (client.rooms == undefined) {
        client.rooms = [];
    }

    client.rooms.push(room);
});

emitter.on('leave', (room, client) => {

    if (client.rooms == undefined) {
        return;
    }

    let index = client.rooms.indexOf(room);

    client.rooms.splice(index, 1);
});

module.exports = {
    rooms: rooms
};