const axios = require('axios');
const { PAYZE_API_BASE_URL } = require('../config/environments');

exports.getPayzeApi = () => axios.create({
    baseURL: PAYZE_API_BASE_URL,
})