const axios = require('axios');

class DeepSeekClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.deepseek.com/v1/wellness-coaching';
    }

    async getWellnessResponse(input) {
        try {
            const response = await axios.post(`${this.baseUrl}/respond`, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` },
                data: { input: input }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching response from DeepSeek:', error);
            throw error;
        }
    }
}

module.exports = DeepSeekClient;