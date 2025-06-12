var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const notificationRoutes = require('./routes/notificationRoutes');
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use('/api/notifications', notificationRoutes);
app.use('/api/videos', videoRoutes);

mongoose.connect('my_mongodb_connection_string');

const userRoutes = require('./routes/userRoutes');
const flirtRoutes = require('./routes/flirtRoutes');
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/users', userRoutes);
app.use('/api/flirts', flirtRoutes);
app.use('/api/messages, messageRoutes');

io.on('connection', socket => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (room) => {
        socket.json(room);
        console.log('User joined room: ${room}');
    });

    socket.on('sendMessage', ({ room, user, message }) => {
        io.to(room).emit('receiveMessage', { user, message, time: new Date() });
    });

    socket.on('disconnect', () => {
        console.log('User disconnectedL', socket.id);
    });
});

server.listen(3000, () => console.log('Server listening on port 3000'));
