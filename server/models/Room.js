const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        joinedAt: { type: Date, default: Date.now },
        is_singing: { type: Boolean, default: false },
        has_sung: { type: Boolean, default: false },
        score_at: { type: Date, default: Date.now }
    }],
    queue: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        song: { type: mongoose.Types.ObjectId, ref: 'Song' },
        added_at: { type: Date, default: Date.now }
    }],
    current_song: {
        song_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
        singer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        started_at: Date,
        duration: Number
    },
    settings: {
        max_participants: { type: Number, default: 8, min: 2, max: 20 },
        is_private: { type: Boolean, default: false },
        password: String,
        allow_duets: { type: Boolean, default: true },
        scoring_enabled: { type: Boolean, default: true },
        genre_filter: [String]
    },
    chat_message: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String, maxlength: 500 },
        timestamp: { type: Date, default: Date.now },
        type: { type: String, enum: ['text', 'emoji', 'system'], default: 'text' }
    }],
    status: {
        type: String,
        enum: ['waiting', 'active', 'paused', 'ended'],
        default: 'waiting'
    },
    stats: {
        total_songs_performed: { type: Number, default: 0 },
        average_score: { type: Number, default: 0 },
        duration_active: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Room', roomSchema);