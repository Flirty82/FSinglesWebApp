import React from 'react';
import './BingoGame.css';

function BingoCell({ number, isMarked, onClick }) {
    return (
        <div
            className={'bingo-cell ${isMarked ? 'marked' : ""}'
}
}
    )
}