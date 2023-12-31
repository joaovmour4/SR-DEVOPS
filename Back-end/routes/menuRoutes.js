const {Router} = require('express')
const router = Router()
const verifyJWT = require('../services/verifyJWT')
const menuController = require('../controllers/menuController')

// router.post('/menu', verifyJWT, menuController.newMenu)
router.get('/menu/:diaSemana', menuController.getMenu)
router.put('/menu/:diaSemana', verifyJWT, menuController.updateMenu)

module.exports = router