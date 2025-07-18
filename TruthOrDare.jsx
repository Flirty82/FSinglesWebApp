import React, { useState } from "react";
import "./TruthOrDare.css";


const truths = [
  "What's your biggest fear in a relationship?",
  "What's a secret you’ve never told anyone?",
  "Have you ever had a crush on someone here?",
  "What's your most embarrassing moment?"
];

const dares = [
  "Do a flirtatious compliment to someone in chat.",
  "Post a voice note saying 'I love karaoke and cats.'",
  "Make up a pickup line and post it publicly.",
  "Change your profile pic to a selfie with a silly face for 10 minutes."
];

const TruthOrDare = () => {
  const [prompt, setPrompt] = useState("");
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return (
    <div className="tod-container">
      <h2>Truth or Dare 🎭</h2>
      <div className="buttons">
        <button onClick={() => setPrompt(random(truths))}>Truth</button>
        <button onClick={() => setPrompt(random(dares))}>Dare</button>
      </div>
      <div className="prompt-box">{prompt && <p>{prompt}</p>}</div>
    </div>
  );
};

export default TruthOrDare;
