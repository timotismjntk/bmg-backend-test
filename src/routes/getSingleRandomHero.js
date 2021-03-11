const route = require('express').Router()
const getSingleRandomHero = require('../controllers/getSingleRandomHero')

route.get('/', getSingleRandomHero.getSingleRandomHero)

module.exports = route
