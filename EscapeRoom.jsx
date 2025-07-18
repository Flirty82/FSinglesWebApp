import React, { useState } from "react";

const EscapeRoom = () => {
  const puzzles = [
    {
      clue: "You find a locked box with a 3-digit code. The note says: 'The code is the number of legs on 3 chairs plus the number of corners on a square.'",
      answer: "16"
    },
    {
      clue: "A computer is locked. Hint: 'I speak without a mouth and hear without ears. What am I?'",
      answer: "echo"
    },
    {
      clue: "To exit the room, you must answer: 'If two’s company and three’s a crowd, what are four and five?'",
      answer: "9"
    }
  ];

  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [solved, setSolved] = useState(false);

  const checkAnswer = () => {
    if (input.trim().toLowerCase() === puzzles[step].answer) {
      if (step + 1 === puzzles.length) {
        setSolved(true);
      } else {
        setStep(step + 1);
        setInput("");
      }
    } else {
      alert("Wrong answer. Try again!");
    }
  };

  return (
    <div className="escape-room">
      <h2>Escape Room 🔍</h2>
      {solved ? (
        <h3>🎉 You escaped! You clever genius.</h3>
      ) : (
        <>
          <p>{puzzles[step].clue}</p>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Your answer"
          />
          <button onClick={checkAnswer}>Submit</button>
        </>
      )}
    </div>
  );
};

export default EscapeRoom;
