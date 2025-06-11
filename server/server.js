const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);

mongoose.connect(mongodb + srv://flirtingsingles:<my_password\
    > @flirtingsingles1.8pfjj.mongodb.net / { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendMessage', async ({ sender, receiver, content }) => {
        await message.save();
        io.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });

    socket.on('sendMessage', async ({ roomId: sender, content }) => {
        const message = new ChatMessage({ room: roomId, sender, content });
        await message.save();
        io.to(roomId).emit('newMessage', message); // Send message to everyone in the room
    });

    socket.on('disconnect', () => console.log('User disconnected:', socke.id));
});

app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/membership', require('./routes/membership'));
app.use('/messages', require('./routes/messages'));
app.use('/chatRooms', require('./routes/chatRooms'));
app.use('/activityFeed', require('./routes/activityFeed'));
app.use('/matching', require('./routes/matching'));
app.use('/search', require('./routes/search'));
app.use('/notifications', require('./routes/notifications'));
app.use('/auth', require('./routes/auth'));
app.use('/customization', require('./routes/customization'));
app.use('/analytics', require('./routes/analytics'));
app.use('/moderation', require('./routes/moderation'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', reuqire('./routes/messages'));

app.listen(3000, () => console.log('Server running on port 3000'));

server.listen(3000, () => console.log('Server running on port 3000'));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/datingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use('/api/posts', require('./routes/posts'));

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});

app.use('/uploads', express.static('uploads'));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Use http server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // React frontend
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB
mongoose.connect('mongodb://localhost:27017/datingApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/messages', require('./routes/messages'));

// Socket.IO connections
io.on('connection', (socket) => {
    console.log('🔌 New user connected');

    socket.on('send_message', (data) => {
        io.emit('receive_message', data); // broadcast to all users
    });

    socket.on('disconnect', () => {
        console.log('❌ User disconnected');
    });
});

// Start server
server.listen(5000, () => {
    console.log('Server running at http://localhost:5000');


    require('dotenv').config();
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

});


