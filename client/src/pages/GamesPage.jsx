import React, { useState } from 'react';
import BingoGame from '../components/games/bingo/BingoGame';

function GamesPage() {
    const [activeGame, setActiveGame] = useState(null);
    
    const renderGameContent = () => {
        switch (activeGame) {
            case 'bingo':
                return <BingoGame/>;
                // case 'truth-or-dare':
                // return <TruthOrDare/>;
                // case 'karaoke':
                // return <KaraokeGame/>;
                // case 'murder-mystery':
                // return <MurderMysteryGame/>;
                default: 
                  return (
                    <div className="games-list-container" style={style.gamesListContainer}>
                        <h2 style={Styles.heading}>Choose a Game</h2>
                        <ul style={styles.gameList}>
                            <li style={styles.gameListItem}>
                                <button onClick={() => setActiveGame('bingo')} style={styles.gameButton}>
                                    Virtual Bingo
                                </button>
                            </li>
                            <li style={styles.gameListItem}>
                                <button disabled style={styles.gameButtonDisabled}>
                                    Truth or Dare
                                </button>
                            </li>
                            <li style={styles.gameListItem}>
                                <button disabled style={styles.gameButtonDisabled}>
                                    Karaoke (Coming Soon!)
                                </button>
                            </li>
                            <li style={styles.gameListItem}>
                                <button disabled style={styles.gameButtonDisabled}>
                                    Virtual Murder Mystery Night (Coming Soon!)
                                </button>
                            </li>
                        </ul>
                    </div>
                  );
        }
    };

    const styles = {
        gamesListContainer: {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'gray',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: '30px auto',
        },
        heading: {
            color: 'black',
            marginBottom: '25px',
        },
        gameList: {
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        gamesListItem: {
            width: '100%',
        },
        gameButton: {
            width: '80%',
            padding: '12px 25px',
            fontSize: '1.1em',
            backgroundColor: 'black',
            color: 'hotpink',
            border: none,
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        gameButton: {
            width: '80%',
            padding: '12px 25px',
            fontSize: '1.1em',
            backgroundColor: '#28a745', 
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }
    }

    return (
        <div>
            {activeGame && (
                <button onClick={() => setActiveGame(null)} style={{ margin: '15px', padding: '8px 15px', backgroundColor: 'gray', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Back to Games List
                </button>
            )}
            {renderGameContent()}
        </div>
    );
}

export default GamesPage;