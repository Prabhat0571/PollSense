import React, { useEffect } from 'react';
import './CelebrationPopup.css';

const CelebrationPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="celebration-popup-overlay">
      <div className="celebration-popup">
        <div className="confetti"></div>
        <h2>🎉 Correct! 🎉</h2>
        <p>Great job! You selected the right answer.</p>
      </div>
    </div>
  );
};

export default CelebrationPopup; 