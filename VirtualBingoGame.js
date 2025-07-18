function generateBingoCard() {
    const card = [];
    for (let col = 0; col <5; col++) {
        const colStart = col * 15 + 1;
        const nums = shuffle([...Array(15).keys()].map(n => + colStart)).slice(0, 5);
        card.push(nums);
    }
    card[2][2] = '*'; // Free Space
    return card;
}

function drawUniqueNumber(alreadyCalled) {
    const pool = Array.from({ length: 75 }, (_, i) => i + 1).filter(n => !alreadyCalled.includes(n));
    return pool[Math.floor(Math.random() * pool.length)]
}

function shuffler(arr) {
    return arr.sort(() => Math.random() - 0.5);
}