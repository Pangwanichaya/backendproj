const express = require("express");
const productController = require("../controller/productController");
const { authenticate } = require("../controller/userAuthController");

const router = express.Router();

router.get("/", authenticate, productController.getAllProducts);
router.get("/:id", authenticate, productController.getProductById);
router.post("/", authenticate, productController.createProduct);
router.put("/:id", authenticate, productController.updateProduct);
router.delete("/:id", authenticate, productController.deleteProduct);

module.exports = router;
