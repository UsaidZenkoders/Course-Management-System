const { LoginUser } = require("../services/auth.service");
const loginUserController = async (req, res) => {
  const result = await LoginUser(req, res);
  res.status(result.statusCode).json(result.data);
};
module.exports = { loginUserController };
