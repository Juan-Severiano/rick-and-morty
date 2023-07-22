const express = require('express');
const route = express.Router();
const home = require('./src/controllers/home')
const characters = require('./src/controllers/characters')
const locations = require('./src/controllers/locations')
const episodes = require('./src/controllers/episodes')

// Rotas da home
route.get('/', home.home);

route.get('/characters', characters.characters)

route.get('/locations', locations.locationController)

route.get('/episodes', episodes.episodeController)


module.exports = route;