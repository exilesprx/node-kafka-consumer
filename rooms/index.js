const emitter = require('../events/emitter');
let rooms = [];

let onJoin = (room, client) => {
    if (client.rooms == undefined) {
        client.rooms = [];
    }

    client.rooms.push(room);
}

let onLeave = (room, client) => {

    if (client.rooms == undefined) {
        return;
    }

    let index = client.rooms.indexOf(room);

    client.rooms.splice(index, 1);
}

emitter.on('join', onJoin);

emitter.on('leave', onLeave);

module.exports = {
    rooms: rooms
};