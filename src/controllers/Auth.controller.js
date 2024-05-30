const { LoginUser, LogoutUser } = require("../services/auth.service");
const { RegisterUser } = require("../services/auth.service");
const loginUserController = async (req, res) => {
  const result = await LoginUser(req, res);
  res.status(result.statusCode).json(result.data);
};
const registerUserController = async (req, res) => {
  const result = await RegisterUser(req, res);
  res.status(result.statusCode).json(result.data);
};

module.exports = { loginUserController,registerUserController };
