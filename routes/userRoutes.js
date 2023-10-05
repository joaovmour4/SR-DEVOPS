const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/user', userController.newUser)
router.get('/user', userController.getUsers)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.post('/login', userController.loginUser)

module.exports = router
