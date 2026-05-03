// ============================================
// Easy Pills - API Configuration Example
// ============================================
// INSTRUCTIONS:
// 1. Copy this file and rename it to config.js
// 2. Replace 'your-api-key-here' with your actual Groq API key
// 3. Get your key at: https://console.groq.com/keys
// 4. Add config.js to .gitignore (it already is!)
// 5. Never commit config.js to version control

window.API_CONFIG = {
    GROQ_API_KEY: 'your-api-key-here',
    GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
    GROQ_MODEL: 'meta-llama/llama-4-scout-17b-16e-instruct'
};
