const pratoController = require("../controllers/pratoController")
const express = require('express')
const router = express.Router()
const verifyJWT = require('../services/verifyJWT')

router.post("/prato", verifyJWT, pratoController.newPrato)
router.get("/prato", verifyJWT, pratoController.getPratos)
router.delete('/prato/:id', verifyJWT, pratoController.deletePrato)
router.put('/prato/:id', verifyJWT, pratoController.modifyPrato)

module.exports = router