const Message = require('../models/Message');

function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('New socket connect:', socket.id);

        socket.on('join', (userId) => {
            socket.join(userId); // Join private room
        });

        socket.on('privateMessage', async ({ sender, receiver, content }) => {
            const message = new Message({ sender, receiver, content });
            await message.save();

            // Send to both users
            io.to(receiver).emit('newMessage', message);
            io.to(sender).emit('newMessage', message); // for sender confirmation
        });
    });
}

module.exports = setupSocket;