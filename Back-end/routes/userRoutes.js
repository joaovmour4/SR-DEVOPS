const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../services/verifyJWT')
const purchaseController = require('../controllers/purchaseController')

const cors = require('cors');


router.post('/user', userController.newUser)
router.get('/user', verifyJWT, userController.getUsers)
router.put('/user/:id', verifyJWT, userController.updateUser)
router.delete('/user/:id', verifyJWT, userController.deleteUser)
router.get('/user/purchases', verifyJWT, userController.currentUserPurchases)

router.post('/login', userController.login)

module.exports = router
