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

router.post(
    "/",
    fileUploader({
        destinationFolder: "product_img",
        fileType:"image",
        prefix: "PROD",
    }).single("product_image"),
    productController.addProduct)

router.patch(
    "/",
    fileUploader({
        destinationFolder: "product_img",
        fileType:"image",
        prefix: "PROD",
    }).single("product_image"),
    productController.updateProduct)

router.get("/", productController.getProductWithParams)

router.delete("/:id", productController.deleteProduct)

router.patch("/:id", productController.convertProduct)

module.exports = router