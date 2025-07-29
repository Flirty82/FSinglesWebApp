import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';
import SongSelector from './SongSelector';
import AudioRecorder from './AudioRecorder';
import Lyrics from './Lyrics';
import ScoreDisplay from './ScoreDisplay';
import '../../styles/components/Karaoke.css';

const KaraokeRoom = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { socket, joinRoom, leaveRoom } = useSocket();

    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [showSongSelector, setShowSongSelector] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [queue, setQueue] = useState([]);
    const [userScore, setUserScore] = useState(0);

    useEffect(() => {
        if (!user || !socket) return;

        // Join room
        joinRoom(roomId);

        // Socket event listeners
        socket.on('room-updated', (roomData) => {
            setRoom(roomData);
            setParticipants(roomData.participants);
            setQueue(roomData.queue);
        });
        socket.on('song-started', (songData) => {
            setCurrentSong(songData);
            setShowSongSelector(false);
        });