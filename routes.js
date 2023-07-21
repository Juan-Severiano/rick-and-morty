const express = require('express');
const route = express.Router();
const home = require('./src/controllers/home')
const characters = require('./src/controllers/characters')

// Rotas da home
route.get('/', home.home);
route.post('/', home.search)

route.get('/characters', characters.characters)


module.exports = route;