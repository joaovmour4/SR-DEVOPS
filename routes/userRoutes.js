const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/create', userController.newUser)
router.get('/get', userController.getUsers)
router.post('/login', userController.loginUser)
router.delete('/delete', userController.deleteUser)
router.put('/update', userController.updateUser)

module.exports = router
