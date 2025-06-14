// Remove or comment this out:
router.post('/', async (req, res) => {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.json(newRoom);
});