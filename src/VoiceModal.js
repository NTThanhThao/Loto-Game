import React, { useState } from 'react';

function VoiceModal({ currentVoice, setCurrentVoice }) {
  const [showModal, setShowModal] = useState(false);
  const voices = [
    { value: 'Khoa', label: 'Giọng Aca' },
    { value: 'Mom', label: 'Giọng "nước trong"' },
    { value: 'Thao', label: 'Giọng Trụy Be' },
    { value: 'Truc', label: 'Giọng Pé Địu' },
  ];

  // Đóng modal khi chọn giọng nói
  const handleVoiceChange = (e) => {
    setCurrentVoice(e.target.value);
    setShowModal(false);
  };

  return (
    <div className="voice-controls" style={{ position: 'absolute', top: 20, right: 50, zIndex: 10 }}>
      <span className="voice-heart-bg" style={{ display: 'inline-block', position: 'relative', width: 38, height: 38, background: 'gold', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
        <span
          className="voice-icon"
          style={{ cursor: 'pointer', fontSize: 28, position: 'relative', zIndex: 2 }}
          onClick={() => setShowModal(!showModal)}
        >
          🎵
        </span>
      </span>
      {showModal && (
        <div className="voice-modal">
          <h2 style={{ marginTop: 0 }}>Chọn Giọng Kêu Lô Tô</h2>
          <select
            id="voiceSelect"
            value={currentVoice}
            onChange={handleVoiceChange}
            style={{
              fontSize: 16,
              padding: 8,
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            {voices.map((voice) => (
              <option key={voice.value} value={voice.value}>
                {voice.label}
              </option>
            ))}
          </select>
          <button
            style={{
              padding: '6px 12px',
              borderRadius: 5,
              border: 'none',
              background: '#ff69b4',
              color: '#fff',
              cursor: 'pointer',
            }}
            onClick={() => setShowModal(false)}
          >
            Đóng
          </button>
        </div>
      )}
    </div>
  );
}

export default VoiceModal;