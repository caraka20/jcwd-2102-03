const express = require("express")
const router = express.Router()
const unitController = require("../controller/unit")

router.get("/", unitController.getAllUnit)

router.post("/", unitController.addUnit)

module.exports = router