const axios = require("axios");

module.exports = axios.create({baseURL: 'http://jsonplaceholder.typicode.com'});