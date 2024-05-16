const bcrypt = require("bcrypt");
const { executeQuery } = require("../utils/executeQuery");

const { generateToken } = require("../middlewares/generateToken");

const RegisterUser = async (req, res) => {
  const { email, password, name, is_Admin } = req.body;
  const tableName = is_Admin ? "teachers" : "students";
  if (!email || !password || !name) {
    return {
      statusCode: 401,
      data: { message: "fields are required" },
    };
  }
  let query = `SELECT * from ${tableName} where email='${email}'`;
  const alreadyExist = await executeQuery(query);
  const hashedPassword = await bcrypt.hash(password, 10);
  if (alreadyExist.length >= 1) {
    return { statusCode: 401, data: { message: "User already exists" } };
  } else {
    const accessToken = generateToken({ email });
    let query = `INSERT INTO ${tableName} (name,email,password) values ('${name}','${email}','${hashedPassword}')`;
    let result = await executeQuery(query);
    const InsertedUser = {
      name: name,
      email: email,
      message: "User created successfully",
    };

    return { statusCode: 201, data: { InsertedUser, accessToken } };
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return {
      statusCode: 401,
      data: { message: "email and password are required" },
    };
  }
  const foundUser = users.find((user) => user.email === email);
  if (foundUser) {
    const matchPass = await bcrypt.compare(password, foundUser.password);
    if (matchPass) {
      const accessToken = generateToken({ email });
      return {
        statusCode: 200,
        data: { message: "User logged in successfully", accessToken },
      };
    } else {
      return {
        statusCode: 401,
        data: { message: "Invalid Email or Password" },
      };
    }
  } else {
    return { statusCode: 401, data: { message: "User not found" } };
  }
};

module.exports = { RegisterUser, LoginUser };
