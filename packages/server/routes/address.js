var express = require("express");
var router = express.Router();

const addressController = require("../controller/addressController");

router.get("/", addressController.getAllAddress);
router.get("/:id", addressController.getAddressById);
router.patch("/:id", addressController.editAddress);
router.get("/user/:id_user", addressController.getAddressByUserId);
router.post("/:id_user", addressController.addAddress);
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
