const pratoController = require("../controllers/pratoController")
const express = require('express')
const router = express.Router()
const verifyJWT = require('../services/verifyJWT')

router.post("/prato", verifyJWT, pratoController.newPrato)
router.get("/prato", verifyJWT, pratoController.getPratos)

module.exports = router