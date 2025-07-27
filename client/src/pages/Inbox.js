import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageThread from '../components/MessageThread';

const Inbox = ({ user }) => {
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);

    useEffect(() => {
        fetch('https://www.flirtingsingles.blog/api/matches');
    }, [matches]);