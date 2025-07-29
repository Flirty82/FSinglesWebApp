import React, { useState, useEffect } from 'react';
import { getMatches, getMessages } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import Chat from './Chat';

const MatchList = () => {
    const { user } = useAuth();
    const [matches, setMatches] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, new, active

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        try {
            const response = await getMatches();
            setMatches(response.data);
        } catch (error) {
            console.error('Error loadingmatches:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredMatches = matches.filter(match => {
        switch (filter) {
            case 'new':
                return match.messages.length === 0;
            case 'active':
                return match.messages.length > 0 && match.last_activity > new Date(Date.now() - 7 * 24 * 60 * 60 1000);
            default:
                return true;
        }
    });

    if (loading) {
        return <div className="loading">Loading matches...</div>;
    }

    return (
        <div className="match-list-container">
            <div className="matches-sidebar">
                <div className="matches-header">
                    <h2>Your Matches ({matches.length})</h2>
                    <div className="filter-tabs">
                        <button
                          className={filter === 'all' ? 'active' : ''}
                          onClick={() => setFilter('all')}>All</button>
                          <button
                             className={filter === 'new' ? 'active' : ''}
                             onClick={() => setFilter('new')}>New</button>
                          <button
                            className={filter === 'active' ? 'active' : ''}
                            onClick={() => setFilter('active')}>Active</button>
                    </div>
                </div>

                <div className="matches-list">
                    {filteredMatches.length === 0 ? (
                        <div className="no-matches">
                            <p>No matches yet.</p>
                            </div>
                    ) : (
                        filteredMatches.map(match => (
                            <div
                              key={match._id}
                              className={'match-item ${selectedMatch?._id === match._id ? 'active' : ''}'}
                              onClick={() => setSelectedMatch(match)}>
                                <div className="match-avatar">
                                    <img
                                      src={match.otherUser.profile.photos[0] || '/default-avatar.png'}
                                      alt={match.otherUser.profile.name}/>
                                      {match.otherUser.online_status.is_online && (
                                        <span className="online-dot"></span>
                                      )}
                                </div>

                                <div className="match-info">
                                    <h3>{match.otherUser.profile.name}</h3>
                                    {match.last_message ? (
                                        <p className="last-message">
                                            {match.last_message.text.length > 30 : '${match.last_message.text.substring(0, 30)}... : match.last_message.text'}
                                        </p>
                                    ) : (
                                        <p className="no-messages">Say hello!</p>
                                    )}
                                    <span className="match-time">
                                        {new Date(match.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                {match.unread_count > 0 && (
                                    <div className="unread-badge">
                                        {match.unread_count}
                                        </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>