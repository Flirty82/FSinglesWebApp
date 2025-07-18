import React, { useState } from 'react';

const Karaoke = () => {
    const [lyrics, setLyrics] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);

    const handleLyricsChange = (e) => {
        setLyrics(e.target.value);
    };

    const handlePlay = () => {
        setIsPlaying(true);
        // Add logic to play karaoke music here
    };

    const handleStop = () => {
        setIsPlaying(false);
        // Add logic to stop karaoke music here
    };

    return (
        <div className="karaoke-container">
            <h2>Karaoke Game</h2>
            <textarea
                value={lyrics}
                onChange={handleLyricsChange}
                placeholder="Enter your lyrics here..."
                rows={6}
                cols={40}
            />
            <div>
                <button onClick={handlePlay} disabled={isPlaying}>
                    Play
                </button>
                <button onClick={handleStop} disabled={!isPlaying}>
                    Stop
                </button>
            </div>
            <div className="karaoke-lyrics">
                <pre>{lyrics}</pre>
            </div>
        </div>
    );

    const predefinedSongs = [
        { title: "Let it go", videoId: "moSF1vxnbgk" },
        { title: "Bohemian Rhapsody", video: "fJ9rUzlMcZQ" },
        { title: "Shallow", videoId: "bo_efYhYU2A" },
        { title: "Backstreet Boys || I want it that way", videoId: "4fndeDfaWCg" }
    ];

    const Karaoke = () => {
        const [selected, setSelected] = useState(null);

        return (
            <div className="karaoke-container">
                <h2>Karaoke Night!</h2>
                <div className="song-selector">
                    {predefinedSongs.map((song) => (
                        <button key={song.videoId} onClick={() => setSelected(song)}>
                            {song.title}
                        </button>
                    ))}
                </div>

                {selected && (
                    <div className="karaoke-video">
                        <h3>Now Singing:{selected.title}</h3>
                        <HTMLIFrameElement
                            width="560"
                            height="315"
                            src={"https://www.youtube.com/embed/${selected.videoold}?autoplay=1"}
                            title="Karaoke Video"
                            allow="autoplay"
                            allowFullScreen />
                    </div>

                )}
            </div>
        );
    }

    const rooms =  ["Pop Divas", "Throwbacks", "Duets", "Country Vibes"];
    const [room, setRoom] = useState("Pop Divas");
    <><div className="room-selector">
        {rooms.map((r) => (
            <button key={r} onClick={() => setRoom(r)}></button>
        ))}
    </div>
        <ChatBox room={karaoke-${rrom} username={currentUser.username}/></>
};

    export default Karaoke;