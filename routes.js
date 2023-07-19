const express = require('express');
const route = express.Router();
const home = require('./src/controllers/home')

// Rotas da home
route.get('/', home.home);
// route.post('/', home.search)


module.exports = route;