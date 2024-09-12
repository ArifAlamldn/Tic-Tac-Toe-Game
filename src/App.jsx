import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [box, setBox] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState('');

  const winnerPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoxes) => {
    for (let key of winnerPattern) {
      const [a, b, c] = key;
      if (newBoxes[a] && newBoxes[a] === newBoxes[b] && newBoxes[a] === newBoxes[c]) {
        setWinner(`Congratulations! ${newBoxes[a]} wins this game!`);
        return;
      }
    }

    if (newBoxes.every((box) => box !== '')) {
      setWinner("It's a draw!");
    }
  };

  const buttonHandler = (index) => {
    if (box[index] || winner) return; // Prevent clicking on already filled boxes or if there's a winner
    const newBoxes = [...box];
    newBoxes[index] = turn ? "X" : "O"; // Fill the box with 'X' or 'O' based on the turn
    setBox(newBoxes);
    setTurn(!turn); // Toggle the turn

    checkWinner(newBoxes); // Pass the newBoxes to checkWinner
  };

  const resetGame = () => {
    setBox(Array(9).fill(''));
    setWinner('');
    setTurn(true);
  };

  return (
    <div className="main">
      <h1>Tic Tac Toe</h1>
      <div className='block-container'>
        {box.map((box, index) => (
          <button
            className={`box ${box === 'X' ? 'x' : box === 'O' ? 'o' : ''}`} // Apply conditional class
            key={index}
            onClick={() => buttonHandler(index)}
          >
            {box}
          </button>
        ))}
      </div>
      <div className='winner'>{winner}</div> {/* Display the winner or draw message */}
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
