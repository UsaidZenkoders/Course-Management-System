const express = require("express");
const validate = require("../middlewares/validate")
const schema=require("../schemas/Auth-Schema")
const AuthRouter = express.Router();
const { loginUserController,registerUserController } = require("../controllers/Auth.controller");
AuthRouter.post("/login", loginUserController);
AuthRouter.post("/register",validate(schema), registerUserController);

module.exports = AuthRouter;
