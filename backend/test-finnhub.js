const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

if (!FINNHUB_API_KEY) {
    console.error('❌ FINNHUB_API_KEY is not defined in .env');
    process.exit(1);
}

const testFinnhub = async () => {
    console.log(`🔑 Using API Key: ${FINNHUB_API_KEY.substring(0, 4)}...`);
    try {
        console.log('📡 Testing connection to Finnhub API (fetching AAPL quote)...');
        const response = await axios.get(`${FINNHUB_BASE_URL}/quote`, {
            params: {
                symbol: 'AAPL',
                token: FINNHUB_API_KEY
            }
        });

        if (response.data.c) {
            console.log('✅ Connection Successful!');
            console.log('📈 Current Price for AAPL:', response.data.c);
        } else {
            console.log('⚠️ Connection successful but unexpected data received:', response.data);
        }
    } catch (error) {
        console.error('❌ Connection Failed:', error.response?.data?.error || error.message);
        if (error.response?.status === 401) {
            console.error('🚫 Unauthorized: Your API Key might be invalid.');
        } else if (error.response?.status === 429) {
            console.error('⏳ Rate Limit Exceeded.');
        }
    }
};

testFinnhub();
