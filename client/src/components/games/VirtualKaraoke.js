import React, { useState, useEffect, useCallback, useRef } from 'react';
import GameService from '../../Services/gameServices';
import './VirtualKaraoke.css';

const VirtualKaraoke = ({ userId, username }) => {
    const [karaokeState, setKaraokeState] = useState({
        sessionId: null,
        isSessionActive: false,
        activeSessions: [],
        isLoading: false,
        error: null
    });

    const [songForm, setSongForm] = useState({
        songTitle: '',
        artist: '',
        duration: 180,
        lyrics: '',
        genre: 'pop',
        difficulty: 'medium'
    });

    const [currentSession, setCurrentSession] = useState(null);
    const [sessionTimer, setSessionTimer] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [participants, setParticipants] = useState([]);

    const timerRef = useRef(null);
    const mediaResourceRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Load active sessions on component mount
    useEffect(() => {
        loadActiveSessions();
    }, []);

    const loadActiveSessions = useCallback(async () => {
        try {
            setKaraokeState(prev => ({ ...prev, isLoading: true }));
            const sessions = await GameService.getActivekaraokeSessions();
            setKaraokeState(prev => ({
                ...prev,
                activeSessions: sessions,
                isLoading: false
            }))
        } catch (error) {
            console.error('Error loading karaoke sessions:', error);
            setKaraokeState(prev => ({
                ...prev,
                error: 'Failed to load sessions',
                isLoading: false
            }));
        }
    }, []);

    const createKaraokeSession = useCallback(async () => {
        if (!songForm.songTitle.trim() || !songForm.artist.trim()) {
            alert('Please enter both song title and artist');
            return;
        }

        try {
            setKaraokeState(prev => ({ ...prev, isLoading: true }));

            const sessionData = await GameService.createKaraokeSession(
                userId,
                songForm.songTitle,
                songForm.srtist,
                songForm.duration
            );

            setCurrentSession(sessionData.session);
            setKaraokeState(prev => {
                ...prev,
                sessionId: sessionData.sessionId,
                isSessionActive: true,
                isLoading: false
            });

            setParticipants([{ id: userId, username }]);

            // Reset form
            setSongForm({
                songTitle: '',
                artist: '',
                duration: 180,
                lyrics: '',
                genre: 'pop',
                difficulty: 'medium'
            });

            // Refresh active sessions
            loadActiveSessions();
        } catch (error) {
            console.error('Error creating karaoke session:', error);
        }
    })
}