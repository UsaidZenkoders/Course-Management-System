const express = require("express");
const LoginRouter = express.Router();
const { loginUserController } = require("../controllers/Login.controller");
LoginRouter.post("/login", loginUserController);
module.exports = LoginRouter;
