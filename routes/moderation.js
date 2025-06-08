const express = require('express');
const Moderation = require('..models/Moderation');
const authenticate = require('../middleware/authenticate');
const express = require('express');

router.post('/report', authenticate, async (req, res) => {
    try {
        const { reportedContentId, contentType, reason } = req.body;
        const report = new Moderation({ reportedBy: req.useId, reportedContentId, contentType, reason });
        await report.save();
        res.json({ message: 'Report submitted' });
    } catch (error) {
        re.status(500).json({ error: 'Failed to submit report' });
    }
});

router.get('/reports', athenticate, async (req, res) => {
    try {
        const reports = await Moderation.find({ status: "pending" }).populate('reportedBy', 'username');
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
});

module.exports = router;
