import React from 'react';
import './FaalResult.css';

function FaalResult({ result, language, onNewWish }) {
  const newWishText = language === 'fa' 
    ? 'فال جدید' 
    : 'New Fortune';

  return (
    <div className="faal-result">
      <div className="result-content" dir={language === 'fa' ? 'rtl' : 'ltr'}>
        <div className="poem">
          {result.poem}
        </div>
        <div className="interpretation">
          {result.interpretation}
        </div>
        <div className="ai-advice">
          {result.advice}
        </div>
      </div>
      <button onClick={onNewWish}>{newWishText}</button>
    </div>
  );
}