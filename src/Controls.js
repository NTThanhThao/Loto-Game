import React from 'react';

function Controls({ isGameRunning, startGame, stopGame, continueGame, stopGameState, allNumbers, children }) {
  return (
    <div className="control-buttons" style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'absolute', top: 20, right: 110, zIndex: 10 }}>
      {isGameRunning && (
        <span className="icon-btn-bg">
          <button className="icon-btn" onClick={stopGame} title="Dừng">
            <svg width="38" height="38" viewBox="0 0 38 38">
              <rect x="10" y="10" width="18" height="18" fill="#f44336" />
            </svg>
          </button>
        </span>
      )}
      {!isGameRunning && stopGameState && allNumbers.length > 0 && (
        <span className="icon-btn-bg">
          <button className="icon-btn" onClick={continueGame} title="Tiếp tục">
            <svg width="38" height="38" viewBox="0 0 38 38">
              <polygon points="12,8 30,19 12,30" fill="#4caf50" />
            </svg>
          </button>
        </span>
      )}
      {children}
    </div>
  );
}

export default Controls;