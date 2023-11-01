const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../services/verifyJWT')
const purchaseController = require('../controllers/purchaseController')


router.post('/user', userController.newUser)
router.get('/user', verifyJWT, userController.getUsers)
router.put('/user/:id', verifyJWT, userController.updateUser)
router.delete('/user/:id', verifyJWT, userController.deleteUser)
router.post('/login', userController.loginUser)
router.get('/user/purchases', verifyJWT, purchaseController.userPurchases)

module.exports = router
