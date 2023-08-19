const express = require("express");
const authController = require("./../Controller/authController");

const router = express.Router({ mergeParams: true });

router.route("/signup").post(authController.signUp);
router.post("/login", authController.login);

module.exports = router;
