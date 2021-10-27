const express = require("express");
const orderController = require("../controller/orderController");
const { authenticate } = require("../controller/userAuthController");
const { upload } = require("../middleware/uploadfile");
const { checkadmin } = require("../controller/userAuthController");

const router = express.Router();

router.get("/", authenticate, orderController.getAllOrders);
router.get("/:id", authenticate, orderController.getOrderById);
router.post(
  "/",
  authenticate,
  //   checkadmin,
  upload.single("picurl"),
  orderController.createOrder
);
router.put("/:id", authenticate, orderController.updateOrder);
router.delete("/:id", authenticate, orderController.deleteOrder);

module.exports = router;
