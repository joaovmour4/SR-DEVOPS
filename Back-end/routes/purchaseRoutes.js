const purchaseController = require("../controllers/purchaseController")
const express = require('express')
const router = express.Router()
const verifyJWT = require('../services/verifyJWT')

router.post("/purchase", verifyJWT, purchaseController.newPurchase)
router.get("/purchase", verifyJWT, purchaseController.getPurchases)

module.exports = router