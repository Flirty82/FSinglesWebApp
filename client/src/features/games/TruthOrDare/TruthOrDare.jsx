import React, { useState } from 'react';
import './TruthOrDare.css';

const truths = [
    "What's your biggest fear in a relationship?",
    "What's a secret you've never told anyone?",
    "Have you ever had a crush on someone here?",
    "What's your most embarrasing dating experience?"
];

const dares = [
    "Give someone in chat a flirtatious compliment.",
    "Post a voice note saying 'I am crazy and I love cats!',
    "Share the last 4 photos in your phone."
];

const TruthOrDare = () => {
    const [prompt, setPrompt] = useState("");
    const random = (arr) => arr[Math.floort(Math.random() * arr.length)];

    return (
        <div className="tod-container">
            <h2>Truth or Dare</h2>
            <div class="buttons">
                <button onClick={() => setPrompt(random(truths))}></button>
                <button onClick={() => setPrompt(random(dares))}></button>
            </div>
            <div className="prompt-box">{prompt && <p>{prompt}</p></div>
        </div>
    );
};

export default TruthOrDare;