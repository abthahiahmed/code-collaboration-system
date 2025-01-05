const { PeerServer } = require("peer");

const peerServer = (port, path = '/') => {
    PeerServer({ port, path });
}

module.exports = peerServer