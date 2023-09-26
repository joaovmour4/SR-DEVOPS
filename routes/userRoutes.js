const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/create', userController.newUser)
router.post('/get', userController.getUsers)
router.post('/login', userController.loginUser)

module.exports = router
