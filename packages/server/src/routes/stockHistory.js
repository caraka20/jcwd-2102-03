const express = require("express")
const router = express.Router()
const StockHistoryController = require("../controller/stockHistory")

router.get("/", StockHistoryController.getHistoryWithParams)

module.exports = router