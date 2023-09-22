const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/create', userController.newUser)
router.get('/get/:id', userController.getUser)

module.exports = router
