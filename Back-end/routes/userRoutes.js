const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../services/verifyJWT')

router.post('/user', userController.newUser) // Criação de usuários
router.get('/user/self', verifyJWT, userController.getSelfUser) // Retorna os dados do usuário logado
router.get('/user', verifyJWT, userController.getUsers) // Retorna todos os usuários
router.put('/user', verifyJWT, userController.modifyCurrentUser) // Edita os dados do usuário que está logado
router.put('/user/:id', verifyJWT, userController.modifyAnyUser) // Edita os dados de um usuário qualquer
router.delete('/user/:id', verifyJWT, userController.deleteUser) // Deleta um usuário qualquer
router.get('/user/purchases', verifyJWT, userController.currentUserPurchases) // Retorna todas as compras do
                                                                            //  usuário que está logado

router.post('/login', userController.login) // Rota para login

module.exports = router
