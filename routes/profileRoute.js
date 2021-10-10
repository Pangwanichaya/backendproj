const express = require("express");
const profileController = require("../controller/profileController");
const { authenticate } = require("../controller/userAuthController");

const router = express.Router();

router.get("/:id", authenticate, profileController.getProfileById);
router.put("/:id", authenticate, profileController.updateProfile);

module.exports = router;
