const express = require("express")
const router = express.Router()
const multer = require("multer")
const productController = require("../controller/product")
const fileUploader = require("../lib/uploader")

const upload = multer({
    limits: {
        fileSize: 10000000000000, //in bytes
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error ("File must be png, jpg, or jpeg"), false)
        }
        cb(null, true)
    }
})

router.get("/user", productController.getAllProduct4User)

router.get("/admin", productController.getAllProduct4Admin)

router.post(
    "/",
    fileUploader({
        destinationFolder: "product_img",
        fileType:"image",
        prefix: "PROD",
    }).single("product_image"),
    productController.addProduct)

router.post(
    "/:id",
    fileUploader({
        destinationFolder: "product_img",
        fileType:"image",
        prefix: "PROD",
    }).single("product_image"),
    productController.updateProduct)

module.exports = router