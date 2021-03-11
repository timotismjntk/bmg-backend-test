const route = require('express').Router()
const authMiddleware = require('../middleware/authentication')
const userController = require('../controllers/user')

route.get('/', authMiddleware.authUser, userController.getDetailProfile)
route.get('/find', userController.getListUser)
route.patch('/update', authMiddleware.authUser, userController.updateUserProfile)

module.exports = route
