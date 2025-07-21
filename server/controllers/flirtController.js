const Flirt = require('../models/Flirt');

exports.sendFlirt = async (req, res) => {
    const { toUserId } = req.body;
    try {
        const flirt = new Flirt({ from: req.user.id, to: toUserId });
        await flirt.save();
        res.status(201).json({ message: "Flirt sent!" });
    } catch {
        res.status(500).json({ message: "Flirt failed." });
    }
};

exports.respondToFlirt = async (req, res) => {
    const { flirtId, action } = req.body; // action: 'accept', 'ignore', 'block'
    try {
        const flirt = await Flirt.findById(flirtId);
        flirt.status = action;
        await flirt.save();
        res.json({ message: "Flirt ${action}ed" });
    } catch {
        res.status(500).json({ message: "Response failed." });
    }
};