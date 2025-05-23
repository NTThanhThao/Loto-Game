import React from 'react';

function Controls({ isGameRunning, startGame, stopGame, continueGame, stopGameState, allNumbers, children, goHome }) {
  return (
    <div className="control-buttons" style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'absolute', top: 20, right: 110, zIndex: 10 }}>
      <span className="icon-btn-bg home-btn-bg" style={{ left: '-20px' }}>
        <button className="icon-btn" onClick={goHome} title="Về trang chủ">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <path d="M4 14L14 6L24 14" stroke="#1976d2" strokeWidth="2" fill="none"/>
            <rect x="8" y="14" width="12" height="8" fill="#1976d2" stroke="#1976d2" strokeWidth="2"/>
          </svg>
        </button>
      </span>
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