import React from 'react';

function History({ history }) {
  return (
    <div id="historyContainer" className="history-container">
      {history.map((num, index) => (
        <span key={index} className="history-item">
          {num}
          {index < history.length - 1 ? ' -' : ''}
        </span>
      ))}
    </div>
  );
}

export default History;