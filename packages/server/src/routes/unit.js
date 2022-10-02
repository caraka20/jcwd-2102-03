const express = require("express")
const router = express.Router()
const unitController = require("../controller/unit")

router.get("/", unitController.getAllUnit)

module.exports = router