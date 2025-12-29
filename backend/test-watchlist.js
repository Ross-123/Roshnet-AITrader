const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { supabase } = require('./src/config/supabase');

const BASE_URL = 'http://localhost:5000/api';

const test = async () => {
    // 1. Test Autocomplete (Search)
    try {
        console.log('Testing Stock Search (Autocomplete)...');
        const searchRes = await axios.get(`${BASE_URL}/stocks/search?q=AAPL`);
        console.log('Search Status:', searchRes.status);
        console.log('Search Results:', searchRes.data.result?.length || 0);
        if (searchRes.data.result?.length > 0) {
            console.log('First result:', searchRes.data.result[0]);
        }
    } catch (err) {
        console.error('Search Failed:', err.message, err.response?.data);
    }

    // 2. Test Add to Watchlist (Simulate)
    // We need a user token for this, which is hard to get without login.
    // However, we can check if the route is reachable (should return 401).
    try {
        console.log('\nTesting Add to Watchlist (Auth Check)...');
        await axios.post(`${BASE_URL}/watchlist`, {
            name: 'Apple Inc',
            ticker: 'AAPL',
            target_price: 150
        });
    } catch (err) {
        console.log('Add to Watchlist Response:', err.response?.status);
        if (err.response?.status === 401) {
            console.log('✅ Correctly returned 401 Unauthorized (Auth middleware is active)');
        } else {
            console.error('❌ Unexpected response:', err.message);
        }
    }
};

test();
