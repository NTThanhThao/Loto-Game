import React, { useState, useEffect, useRef } from 'react';
import VoiceModal from './VoiceModal';
import NumberContainer from './NumberContainer';
import History from './History';
import Controls from './Controls';
import './App.css';

function App() {
  const [currentVoice, setCurrentVoice] = useState('Truc');
  const [history, setHistory] = useState([]);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [allNumbers, setAllNumbers] = useState(Array.from({ length: 90 }, (_, i) => i + 1));
  const [stopGame, setStopGame] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [gameInterval, setGameInterval] = useState(null);
  const [showHome, setShowHome] = useState(true);
  const stopGameRef = useRef(stopGame);

  useEffect(() => {
    stopGameRef.current = stopGame;
  }, [stopGame]);

  useEffect(() => {
    if (!showHome && isGameRunning) {
      document.body.classList.add('game-running');
      document.body.style.backgroundImage = `url('/Picture1.png')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    } else {
      document.body.classList.remove('game-running');
      document.body.style.backgroundImage = '';
    }
  }, [isGameRunning, showHome]);

  useEffect(() => {
    // Cleanup interval on unmount
    return () => {
      if (gameInterval) clearInterval(gameInterval);
    };
  }, [gameInterval]);

  const playSound = (number) => {
    try {
      const audio = new Audio(`/sounds/${currentVoice}/lotofa/${number}.m4a`);
      audio.play().catch((error) => {
        alert(`Không tìm thấy file âm thanh cho số: ${number}`);
      });
    } catch (error) {
      alert(`Lỗi khi phát âm thanh cho số: ${number}`);
    }
  };

  const addToHistory = (number) => {
    setHistory((prev) => [...prev, number].slice(-5));
  };

  const startGame = () => {
    setShowHome(false);
    setAllNumbers(Array.from({ length: 90 }, (_, i) => i + 1));
    setHistory([]);
    setCurrentNumber(null);
    setIsGameRunning(true);
    setStopGame(false);
    nextNumber(Array.from({ length: 90 }, (_, i) => i + 1));
  };

  const nextNumber = (numbers) => {
    if (numbers.length === 0) {
      setIsGameRunning(false);
      setCurrentNumber(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomNumber = numbers[randomIndex];
    setCurrentNumber(randomNumber);
    playSound(randomNumber);
    addToHistory(randomNumber);
    const newNumbers = numbers.filter((_, i) => i !== randomIndex);
    setAllNumbers(newNumbers);
    const interval = setTimeout(() => {
      if (!stopGameRef.current) {
        nextNumber(newNumbers);
      } else {
        setGameInterval(null);
      }
    }, 6000);
    setGameInterval(interval);
  };

  const stopGameHandler = () => {
    setStopGame(true);
    setIsGameRunning(false);
    if (gameInterval) clearTimeout(gameInterval);
  };

  const continueGame = () => {
    if (!isGameRunning && stopGame && allNumbers.length > 0) {
      setIsGameRunning(true);
      setStopGame(false);
      // Đảm bảo không bị clearTimeout, chỉ tiếp tục mạch nextNumber
      const interval = setTimeout(() => {
        nextNumber(allNumbers);
      }, 0);
      setGameInterval(interval);
    }
  };

  if (showHome) {
    return (
      <div className="home-background">
        <h1 className="game-title" style={{position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, 0)', zIndex: 2}}>Lô Tô Đất Tổ</h1>
        <img src="/home.jpg" alt="Home Background" className="background-gif" />
        <div className="star-container">
          <button className="start-button" onClick={startGame}>
            <svg viewBox="0 0 48 48">
              <polygon className="star-shape" points="24,3 30,18 46,18 33,28 38,44 24,34 10,44 15,28 2,18 18,18" />
            </svg>
            <span>Bắt đầu</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <VoiceModal currentVoice={currentVoice} setCurrentVoice={setCurrentVoice} />
      <div className="current-number-display">
        {currentNumber !== null ? currentNumber : '---'}
      </div>
      <NumberContainer allNumbers={allNumbers} currentNumber={currentNumber} />
      <History history={history} currentNumber={currentNumber} />
      <Controls
        isGameRunning={isGameRunning}
        startGame={startGame}
        stopGame={stopGameHandler}
        continueGame={continueGame}
        stopGameState={stopGame}
        allNumbers={allNumbers}
      />
    </div>
  );
}

export default App;
