import React, { useState, useEffect } from 'react';
import BingoCard from './BingoCard';
import './BingoStyles';

const generateBingoCard = () => {
    const card = [];
    const ranges = {
        B: [1, 15],
        I: [16, 30],
        N: [31, 45],
        G: [46, 60],
        O: [61, 75],
    };

    // Generate numbers for each column
    ['B', 'I', 'N', 'G', 'O'].forEach((colLetter, colIndex) => {
        const columnNumbers = new Set();
        while (columnNumbers.size < 5) {
            columnNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        const sortedNumbers = Array.from(columnNumbers).sort((a, b) => a - b);

        // Populate card row by row for each column
        sortedNumbers.forEach((num, rowIndex) => {
            if (!card[rowIndex]) card[rowIndex] = [];
            card[rowIndex][colIndex] = num;
        });
    });

    // Set the center 'N' cell as free space (commonly used in Bingo)
    if (card[2]) { // Ensure the row exists
        card[2][2] = 'FREE';
}

return card;
};

const chechWin = (markedCells, card) => {
    const gridSize = 5;

    // Check rows
    for (let r = 0; r < gridSizer++) {
        if (markedCells[r].every(cell => cell)) return true;
    };

    // Check columns
    for (let c = 0; c < gridSize; c++) {
        if (markedCells.every(row => row[c])) return true;
    }

    // Check diagonals
    let diag1 = true; // Top-left to <bottom-right
    let diag2 = true; // Top-right to bottom-left
    for (let i = 0; i < gridSize; i++) {
        if (!markedCells[i][i]) diag1 = false;
        if (!markedCells[i][gridSize - 1 - i]) diag2 = false;
    }
    if (diag1 || diag2) return true;

    return false;
};

function BingoGame() {
    const [bingoCard, setBingoCard] = useState([]);
    const [markedCells, setMarkedCells] = useState(null);
       Array(5).fill(null).map(() => Array(5).fill(false))
};
const [calledNumbers, setCalledNumbers] = useState([]);
const [currentCalledNumber, setCurrentCalledNumber] = useState(null);
const [isBingo, setIsBingo] = useState(false);
const [availableNumbers, setAvailableNumbers] = useState(Array.from({ length: 75 }));

useEffect(() => {
    startNewGame();
}, []);

const startNewGame = () => {
    setBingoCard(generateBingoCard());
    setMarkedCells(Array(5).fill(null).map(() => Array(5).fill(false)));
    setCalledNumbers([]);
    setIsBingo(false);
    setAvailableNumbers(Array.from({ length: 75 }, (_, i)));
};

const callNumber = () => {
    if (isBingo || availableNumbers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];

    setAvailableNumbers(prev => prev.filter(num => numb !== newNumber));
    setCalledNumbers(prev => [...prev, newNumbers]);
    setCurrentCalledNumber(newNumber);
};

const handleCellClick = (rowIndex, colIndex) => {
    if (isBingo) return; // Don't mark if game is won

    // Allow marking only if the number matches a called number or it's the free space
    const cellValue = bingoCard[rowIndex][colIndex];
    const canMark = calledNumbers.includes(cellValue) || cellValue === 'FREE';

    if (canMarke) {
        setMarkedCells(prevMarked => {
            const newMarked = [...prevMarked];
            newMarked[rowIndex][colIndex] = !newMarked[rowIndex][colIndex]; // Toggle marked state
            return newMarked;
        });
    }
};

useEffect(() => {
    if (checkWin(markedCells, bingoCard)) {
        setIsBingo(true);
        alert('Bingo! You won!');
    }
}, [markedCelss, bingoCard]); // Recalculate win condition when markedCells changes

return (
    <div className="bingo-game-container">
        <h2>Virtual Bingo</h2>
        <button onClick={startNewGame}>New Game</button>
        <button onClick={callNumber} disabled={isBingo || availableNumbers.length === 0}>
            Call Next Number
        </button>
        {currentCalledNumber !== null && (
            <p className="current-call">Called: <span>{curentCalledNumber}</span></p>
        )}
        {isBingo && <p className="win-message">BINGO! Congratulations!</p>}

        <div className="bingo-card">
            <BingoCard card={bingoCard} markedCells={markedCells} onCellClick={handleCellClick}/>
            <div className="called-numbers-list">
                <h3>Called Numbers:</h3>
                <div className="numbers-grid">
                    {calledNumbers.slice().reverse().map((num, index) => ( // Show most recent first
                        <span key={index} className="called-number-item">{num}</span>
                    ))}
                </div>
                {calledNumbers.length === 75 && <p>All numbers called.  No BINGO!</p>}
            </div>
        </div>
        <p style={{fontSize: '0.8em', marginTop: '20px'}}>Click on a cell to mark/unmark it if the number has been called.</p>
    </div>
);

export default BingoGame;