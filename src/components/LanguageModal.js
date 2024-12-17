import React from 'react';
import './LanguageModal.css';

function LanguageModal({ onSelect, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="language-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Select Language / انتخاب زبان</h2>
        <div className="language-buttons">
          <button onClick={() => onSelect('fa')}>
            فارسی
          </button>
          <button onClick={() => onSelect('en')}>
            English
          </button>
        </div>
      </div>
    </div>
  );
}