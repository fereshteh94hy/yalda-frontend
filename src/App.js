import React, { useState } from 'react';
import './App.css';

function App() {

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [language, setLanguage] = useState(null);
  const [wish, setWish] = useState('');
  const [showWishForm, setShowWishForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fortune, setFortune] = useState(null);

  const handleClose = () => {
    setShowLanguageModal(false);
    setShowWishForm(false);
    setLanguage(null);
    setWish('');
    setFortune(null);
    setError(null);
  };

  const handleBookClick = () => {
    setShowLanguageModal(true);
    setWish('');
    setFortune(null);
    setError(null);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguageModal(false);
    setShowWishForm(true);
  };

  const getFortune = async () => {
    if (!wish.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/hafez/getFal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wish: wish,
          language: language
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFortune(data);
      setWish('');
    } catch (err) {
      setError(language === 'fa' 
        ? 'خطا در دریافت فال. لطفاً دوباره تلاش کنید.'
        : 'Error getting fortune. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="yalda-scene">
      
        <div className="moon">
          <div className="moon-crater"></div>
        </div>
        <div className="central-group">
        
          <div className="pomegranate-group left">
            <div className="pomegranate">
              <div className="pomegranate-body"></div>
              <div className="pomegranate-crown"></div>
              <div className="pomegranate-shine"></div>
            </div>
            <div className="pomegranate small">
              <div className="pomegranate-body"></div>
              <div className="pomegranate-crown"></div>
              <div className="pomegranate-shine"></div>
            </div>
          </div>

        
          <div className="candle-group">
            <div className="candle tall">
              <div className="candle-body"></div>
              <div className="flame"></div>
              <div className="flame-reflection"></div>
            </div>
            <div className="candle short">
              <div className="candle-body"></div>
              <div className="flame"></div>
              <div className="flame-reflection"></div>
            </div>
          </div>

         
          <div className="book" onClick={handleBookClick}>
  <div className="book-cover">
    <span className="book-title-fa"> حافظ</span>
    <span className="book-title-en">Hafez</span>
    <div className="book-decoration"></div>
  </div>
  <div className="book-pages"></div>
  <div className="book-shine"></div>
  
  <div className="watermelon-whole">
    <div className="watermelon-body">
      <div className="watermelon-stripes"></div>
      <div className="watermelon-highlight"></div>
    </div>
    <div className="watermelon-cut">
      <div className="watermelon-cut-rind"></div>
      <div className="watermelon-cut-pattern"></div>
      <div className="watermelon-cut-seeds">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className="watermelon-cut-seed"
            style={{
              transform: `rotate(${45 + Math.random() * 45}deg)`,
              opacity: 0.7 + Math.random() * 0.3
            }}
          />
        ))}
      </div>
    </div>
  </div>
</div>


          <div className="pomegranate-group right">
            <div className="pomegranate">
              <div className="pomegranate-body"></div>
              <div className="pomegranate-crown">
                <div className="triangle"></div>
                <div className="triangle"></div>
                <div className="triangle"></div>
              </div>
              <div className="pomegranate-shine"></div>
            </div>
            <div className="pomegranate small">
              <div className="pomegranate-body"></div>
              <div className="pomegranate-crown"></div>
              <div className="pomegranate-shine"></div>
            </div>
          </div>
        </div>

        {showLanguageModal && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={handleClose}>×</button>
              <h2>Choose Your Language / انتخاب زبان</h2>
              <div className="language-buttons">
                <button onClick={() => handleLanguageSelect('fa')} className="persian-btn">
                  فارسی
                </button>
                <button onClick={() => handleLanguageSelect('en')} className="english-btn">
                  English
                </button>
              </div>
            </div>
          </div>
        )}

        {showWishForm && (
          <div className="wish-form">
            <div className="wish-form-content">
              <button className="close-button" onClick={handleClose}>×</button>
              <h3>{language === 'fa' ? 'آرزوی یلدایی' : ' Yalda Wish'}</h3>
              
              {error && <div className="error-message">{error}</div>}
              
              {!fortune ? (
                <>
                  <textarea
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    placeholder={language === 'fa' ? 'آرزوی خود را بنویسید...' : 'Write your wish...'}
                    dir={language === 'fa' ? 'rtl' : 'ltr'}
                    disabled={loading}
                  />
                  <button 
                    className="submit-wish"
                    onClick={getFortune}
                    disabled={loading || !wish.trim()}
                  >
                    {loading 
                      ? (language === 'fa' ? 'در حال دریافت فال...' : 'Getting fortune...') 
                      : (language === 'fa' ? 'گرفتن فال' : 'Get Fortune')}
                  </button>
                </>
              ) : (
                <div className="fortune-result" dir={language === 'fa' ? 'rtl' : 'ltr'}>
                  <div className="poem">{fortune.poem}</div>
                  <div className="interpretation">{fortune.interpretation}</div>
                  <div className="prediction">{fortune.prediction}</div>
                  <button 
                    className="new-fortune"
                    onClick={() => {
                      setFortune(null);
                      setWish('');
                    }}
                  >
                    {language === 'fa' ? 'فال جدید' : 'New Fortune'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;