const {Router} = require('express')
const router = Router()
const verifyJWT = require('../services/verifyJWT')
const menuController = require('../controllers/menuController')

router.post('/menu', verifyJWT, menuController.newMenu)

module.exports = router