const { Server } = require('socket.io');
const Message = require('./models/Message');

let io;

function setupSocket(server) {
    io = new Server(server, {
        cors: { origin: '*' }
    });

    io.on('connection', socket => {
        console.log('User connected:', socket.id);

        socket.on('join', userId => {
            socket.join(userId); // User joins their own room
        });

        socket.on('send-message', async ({ sender, receiver, content }) => {
            const message = new Message({ sender, receiver, content });
            await message.save();

            io.to(receiver).
        };
    });

    socket.on('chatInvite', ({ toUserId, fromUser }) => {
        io.to(toUserId).emit('chatInvite', { fromUser });
    });
};

return io;

module.exports = { initSocket };