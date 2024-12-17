// src/services/api.js
const API_BASE_URL = 'http://localhost:8080/api';

export const getFortune = async (wish, language) => {
    try {
        const response = await fetch(`${API_BASE_URL}/hafez/faal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                wish,
                language
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching fortune:', error);
        throw error;
    }
};