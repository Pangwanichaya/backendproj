const express = require("express");
const orderItemController = require("../controller/orderItemController");
const { authenticate } = require("../controller/userAuthController");

const router = express.Router();

router.get("/", authenticate, orderItemController.getAllOrderItems);
router.get("/:id", authenticate, orderItemController.getOrderItemById);
router.post("/", authenticate, orderItemController.createOrderItem);
router.put("/:id", authenticate, orderItemController.updateOrderItem);
router.delete("/:id", authenticate, orderItemController.deleteOrderItem);

module.exports = router;
