const route = require('express').Router()
const authMiddleware = require('../middleware/authentication')
const refferalCodeController = require('../controllers/refferalCode')

route.get('/', authMiddleware.authUser, refferalCodeController.inputReffCode)

module.exports = route
