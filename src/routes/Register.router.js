const express = require("express");
const RegisterRouter = express.Router();
const {
  registerUserController,
} = require("../controllers/Register.controller");
RegisterRouter.post("/register", registerUserController);
module.exports = RegisterRouter;
