const { createServer } = require('http');
const next = require('next');
const CollabSocket = require('./src/socket/collab');
const PeerServer = require('./src/socket/peerjs');

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    CollabSocket(httpServer); 
    PeerServer(3001);

    httpServer
    .once("error", (err) => {
        console.error(err);
        process.exit(1);
    })
    .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});