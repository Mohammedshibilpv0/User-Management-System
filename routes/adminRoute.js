const express = require("express");
const adminRoute = express();
const adminController = require("../controller/adminController");
const middle = require("../middleware/adminMiddleware");
const noCache= require('nocache')
adminRoute.use(noCache());
adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended: true }));

adminRoute.set("view engine", "ejs");
adminRoute.set("views", "./views/admin");



adminRoute.get("/", middle.verify, adminController.home);
adminRoute.get("/login", adminController.login);
adminRoute.post("/submit", adminController.submit);
adminRoute.get("/logout", adminController.logout);
adminRoute.get('/deleteuser/:id',middle.verify,adminController.deleteUser)
adminRoute.get('/updateuser/:id',middle.verify,adminController.editUser)
adminRoute.post('/editsubmit/:id',adminController.editSubmit)
adminRoute.get('/createuser',middle.verify,adminController.signup)
adminRoute.post('/createsubmit',adminController.signupsub)


module.exports = adminRoute;
