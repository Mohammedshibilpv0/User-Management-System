const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const middle = require("../middleware/userMiddleware");

router.get("/", middle.verify, userController.home);
router.get("/login", middle.login, userController.login);
router.get("/signup", userController.signup);
router.post("/signupsubmit", userController.insertUser);
router.post("/loginSubmit", userController.loginsub);
router.get("/logout", userController.logout);
router.get("/404", userController.error);


module.exports = router;
