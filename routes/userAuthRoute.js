const express = require("express");
const router = express.Router();
const userAuthController = require("../controller/userAuthController");

router.post("/login", userAuthController.login);
router.post("/register", userAuthController.register);

module.exports = router;
