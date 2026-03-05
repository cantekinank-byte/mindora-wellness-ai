const express = require('express');
const router = express.Router();
const axios = require('axios');
const { checkAuthentication } = require('../middleware/authMiddleware');

const DEEPSEEK_API_URL = 'https://api.deepseek.ai/chat'; // Adjust this to the actual DeepSeek API endpoint
const FREE_USER_MESSAGE_LIMIT = 5; // Maximum messages for free users

// Middleware to check user message limits
const checkMessageLimits = (req, res, next) => {
    const user = req.user; // User information from authentication middleware
    if (user && user.isFreeUser && user.messageCount >= FREE_USER_MESSAGE_LIMIT) {
        return res.status(403).json({ error: 'Message limit reached for free users.' });
    }
    next();
};

// Authenticated chat endpoint
router.post('/chat', checkAuthentication, checkMessageLimits, async (req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await axios.post(DEEPSEEK_API_URL, { message: userMessage });

        // Increment user's message count
        if (req.user.isFreeUser) {
            req.user.messageCount += 1; // Example logic, ensure messageCount is stored correctly
        }

        return res.json(response.data);
    } catch (error) {
        console.error('Error communicating with DeepSeek API:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;