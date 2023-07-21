const express = require('express');
const route = express.Router();
const home = require('./src/controllers/home')
const characters = require('./src/controllers/characters')
const locations = require('./src/controllers/locations')

// Rotas da home
route.get('/', home.home);
route.post('/', home.search)

route.get('/characters', characters.characters)

route.get('/locations', locations.locationController)


module.exports = route;