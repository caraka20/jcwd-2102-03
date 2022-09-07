var express = require("express");
var router = express.Router();
const fileUploader = require("../lib/uploader");

const userController = require("../controller/userController");

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.editUser);
router.post("/", userController.addUser);
router.delete("/:id", userController.deleteUser);

router.patch(
  "/upload/:id",
  fileUploader({
    destinationFolder: "profile_pict",
    fileType: "image",
    prefix: "POST",
  }).single("image"),
  userController.uploadProfilePict
);

module.exports = router;
