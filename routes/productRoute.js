const express = require("express");
const productController = require("../controller/productController");
const { authenticate } = require("../controller/userAuthController");
const { upload } = require("../middleware/uploadfile");
const router = express.Router();
const { checkadmin } = require("../controller/userAuthController");

router.get("/", authenticate, productController.getAllProducts);
router.get("/:id", authenticate, productController.getProductById);
router.post(
  "/",
  authenticate,

  upload.single("picurl"),
  productController.createProduct
);
router.put(
  "/:id",
  authenticate,

  upload.single("picurl"),
  productController.updateProduct
);
router.delete(
  "/:id",
  authenticate,

  productController.deleteProduct
);

module.exports = router;
