const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true // in seconds
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    audio_files: {
        original: String, // Full song with vocals
        instrumental: String, // Backing track without vocals
        preview: String // 30-second preview
    },
    lyrics: [{
        text: String,
        start_time: Number, // in milliseconds
        end_time: Number
    }],
    key: String, // Musical key
    bpm: Number, // Beats per minute
    language: String,
    release_year: Number,
    album: String,
    popularity_score: { type: Number, default: 0 },
    times_performed: { type: Number, default: 0 },
    average_score: { type: Number, default: 0 },
    tags: [String],
    is_premium: { type: Boolean, default: false }
}, {
    timestamps: true
});

songSchema.index({ title: 'text', artist: 'text' });

module.exports = mongoose.model('Song', songSchema);