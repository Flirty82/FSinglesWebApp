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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.listen(3000, () => console.log('Server running on port 3000'));

server.listen(3000, () => console.log('Server running on port 3000'));
