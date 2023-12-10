const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    PAYZE_API_KEY: process.env.PAYZE_API_KEY,
    PAYZE_API_SECRET: process.env.PAYZE_API_SECRET,
    PAYZE_API_BASE_URL: process.env.PAYZE_API_BASE_URL,
    PAYZE_API_METHOD: process.env.PAYZE_API_METHOD,
    PAYZE_TOKEN_SECRET_KEY: process.env.PAYZE_TOKEN_SECRET_KEY,
    PAYZE_TOKEN_EXPIRE_TIME: process.env.PAYZE_TOKEN_EXPIRE_TIME,
    PAYZE_SUCCESS_URL: process.env.PAYZE_SUCCESS_URL,
    PAYZE_ERROR_URL: process.env.PAYZE_ERROR_URL,
    PAYZE_HOOK_URL: process.env.PAYZE_HOOK_URL
}