const express = require('express')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.post('/sessions', controllers.SessionController.store)

routes.use(authMiddleware)

module.exports = routes
