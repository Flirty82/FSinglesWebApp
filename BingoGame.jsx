import React, { useState, useEffect } from "react";
import "./BingoGame.css";

const generateBoard = () => {
  const board = [];
  while (board.length < 25) {
    const num = Math.floor(Math.random() * 75) + 1;
    if (!board.includes(num)) board.push(num);
  }
  board[12] = "⭐"; // Free space in the center
  return board;
};

const BingoGame = () => {
  const [board, setBoard] = useState(generateBoard());
  const [marked, setMarked] = useState([]);

  const toggleCell = (idx) => {
    if (marked.includes(idx)) {
      setMarked(marked.filter(i => i !== idx));
    } else {
      setMarked([...marked, idx]);
    }
  };

  return (
    <div className="bingo-board">
      {board.map((val, idx) => (
        <div
          key={idx}
          className={`bingo-cell ${marked.includes(idx) ? "marked" : ""}`}
          onClick={() => toggleCell(idx)}
        >
          {val}
        </div>
      ))}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./BingoGame.css";

const socket = io("http://localhost:5000"); // use your deployed backend in production

const BingoGame = () => {
  const [board, setBoard] = useState(generateBoard());
  const [drawnNumber, setDrawnNumber] = useState(null);
  const [room, setRoom] = useState("bingo-lobby");

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("bingo_number", (number) => {
      setDrawnNumber(number);
    });

    return () => socket.off("bingo_number");
  }, [room]);

  const generateNumber = () => {
    const number = Math.floor(Math.random() * 75) + 1;
    socket.emit("generate_number", { room, number });
  };

  return (
    <div className="bingo-room">
      <h2>Room: {room}</h2>
      <button onClick={generateNumber}>Call Number</button>
      {drawnNumber && <h3>Number Drawn: {drawnNumber}</h3>}
      <div className="bingo-board">
        {board.map((val, idx) => (
          <div key={idx} className="bingo-cell">
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

function generateBoard() {
  const board = [];
  while (board.length < 25) {
    const num = Math.floor(Math.random() * 75) + 1;
    if (!board.includes(num)) board.push(num);
  }
  board[12] = "⭐";
  return board;
}

export default BingoGame;


export default BingoGame;
