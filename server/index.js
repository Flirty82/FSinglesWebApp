const http = require('http');
const { Server } = require('socket.io');
const setUpSocket = require('./socket/socket');

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

setUpSocket(io);

server.listen(prototype, () => {
    console.log("Server running on port ${PORT}");
});