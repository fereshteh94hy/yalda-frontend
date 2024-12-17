import React, { useState } from 'react';
import { getFortune } from './api';
import './WishForm.css';

function WishForm({ language, onFortuneReceived }) {
    const [wish, setWish] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const placeholder = language === 'fa' 
        ? 'آرزوی یلدایی خود را بنویسید...'
        : 'Write your Yalda wish...';

    const buttonText = language === 'fa' ? 'گرفتن فال' : 'Get Fortune';
    const loadingText = language === 'fa' ? 'در حال دریافت فال...' : 'Getting fortune...';
    const errorText = language === 'fa' 
        ? 'خطا در دریافت فال. لطفاً دوباره تلاش کنید.'
        : 'Error getting fortune. Please try again.';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!wish.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await getFortune(wish, language);
            onFortuneReceived(response);
            setWish(''); // پاک کردن فیلد بعد از موفقیت
        } catch (err) {
            setError(errorText);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wish-form-container">
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    placeholder={placeholder}
                    dir={language === 'fa' ? 'rtl' : 'ltr'}
                    disabled={loading}
                />
                <button type="submit" disabled={loading || !wish.trim()}>
                    {loading ? loadingText : buttonText}
                </button>
            </form>
        </div>
    );
}

export default WishForm;