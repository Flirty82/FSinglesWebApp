import React, { useState } from "react";

const predefinedSongs = [
  { title: "Let It Go", videoId: "moSFlvxnbgk" },
  { title: "Bohemian Rhapsody", videoId: "fJ9rUzIMcZQ" },
  { title: "Shallow", videoId: "bo_efYhYU2A" },
  { title: "Backstreet Boys – I Want It That Way", videoId: "4fndeDfaWCg" }
];

const Karaoke = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="karaoke-container">
      <h2>Karaoke Night 🎤</h2>
      <div className="song-selector">
        {predefinedSongs.map((song) => (
          <button key={song.videoId} onClick={() => setSelected(song)}>
            {song.title}
          </button>
        ))}
      </div>

      {selected && (
        <div className="karaoke-video">
          <h3>Now Singing: {selected.title}</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${selected.videoId}?autoplay=1`}
            title="Karaoke Video"
            allow="autoplay"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

const rooms = ["Pop Divas", "Throwback Hits", "Duets", "Country Vibes"];
const [room, setRoom] = useState("Pop Divas");
<><div className="room-selector">
  {rooms.map((r) => (
    <button key={r} onClick={() => setRoom(r)}>{r}</button>
  ))}
</div><ChatBox room={`karaoke-${room}`} username={currentUser.username} /></>


export default Karaoke;
