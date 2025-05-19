import React from 'react';

function Controls({ isGameRunning, startGame, stopGame, continueGame, stopGameState, allNumbers }) {
  // stopGameState: true nếu đã dừng, false nếu chưa dừng
  // allNumbers: mảng các số còn lại
  return (
    <div className="control-buttons">
      {!isGameRunning && !stopGameState && (
        <button id="startButton" onClick={startGame}>
          <img src="/rabbit.png" alt="Rabbit Icon" className="button-icon" /> Bắt Đầu
        </button>
      )}
      {isGameRunning && (
        <button id="stopButton" onClick={stopGame}>Dừng</button>
      )}
      {!isGameRunning && stopGameState && allNumbers.length > 0 && (
        <>
          <button id="stopButton" disabled>Dừng</button>
          <button id="continueButton" onClick={continueGame}>Tiếp Tục</button>
        </>
      )}
    </div>
  );
}

export default Controls;