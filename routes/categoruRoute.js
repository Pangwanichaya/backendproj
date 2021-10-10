const express = require("express");
const categoryController = require("../controller/categoryController");
const { authenticate } = require("../controller/userAuthController");

const router = express.Router();

router.get("/", authenticate, categoryController.getAllcategorys);
router.get("/:id", authenticate, categoryController.getcategoryById);
router.post("/", authenticate, categoryController.createCategory);
router.put("/:id", authenticate, categoryController.updateCategory);
router.delete("/:id", authenticate, categoryController.deleteCategory);

module.exports = router;
