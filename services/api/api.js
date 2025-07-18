router.post('start/:roomId', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    const cards = {};

    room.participants.forEach(p => {
        cards[p.userId] = generateBingoCard();
    });

    const newGame = new BingoGame({ roomId, playerCards: cards, calledNumbers: [] });
    await newGame.save();
    io.to(roomId).emit('bingo-started', newGame);
    res.status(201).json(newGame);
});

router.post('/call/:roomId', async (req, res) => {
    const game = await BingoGame.findOne({ roomId: req.params.roomId });
    const nextNumber = drawUniqueNumber(game.calledNumbers);
    game.calledNumbers.push(nextNumber);
    await game.save();
    io.to(req.params.roomId).emit('bingo-number', nextNumber);
    res.status(200).json({ number: nextNumber });
});

import axios from 'axios';

const api = axios.create({
    baseURL: "https://flirtingsingles.blog"
});

export default api;