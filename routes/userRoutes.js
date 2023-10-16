const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../services/verifyJWT')


router.post('/user', userController.newUser)
router.get('/user', verifyJWT, userController.getUsers)
router.put('/user/:id', verifyJWT, userController.updateUser)
router.delete('/user/:id', verifyJWT, userController.deleteUser)
router.post('/login', userController.loginUser)

module.exports = router
