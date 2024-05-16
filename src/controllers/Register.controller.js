const { RegisterUser } = require("../services/auth.service");

const registerUserController = async (req, res) => {
  const result = await RegisterUser(req, res);
  res.status(result.statusCode).json(result.data);
};
module.exports = { registerUserController };
