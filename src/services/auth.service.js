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
    const accessToken = generateToken({ email,is_Admin });
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
  const { email, password, is_Admin } = req.body;
  if (!email || !password) {
    return {
      statusCode: 401,
      data: { message: "email and password are required" },
    };
  }
  const tableName = is_Admin ? "teachers" : "students";
  let getHashedPass = `SELECT password as hashedPassword from ${tableName} where email='${email}'`;
  const DbFetchedPass = await executeQuery(getHashedPass);
  console.log(DbFetchedPass, DbFetchedPass.length);
  if (DbFetchedPass.length === 1) {
    const hashedPassword = DbFetchedPass[0].hashedPassword;
    let registeredUser = `SELECT COUNT(*) AS user_in_db FROM ${tableName} WHERE email= '${email}' AND password ='${hashedPassword}'`;
    const UserExist = await executeQuery(registeredUser);
    if (UserExist[0].user_in_db === 1) {
      const accessToken = generateToken({ email ,is_Admin});
      return {
        statusCode: 200,
        data: { message: "User logged in successfully", accessToken },
      };
    } else {
      return { statusCode: 401, data: { message: "User not found" } };
    }
  } else {
    return {
      statusCode: 401,
      data: {
        message: "No hashed Password exist",
      },
    };
  }
};

module.exports = { RegisterUser, LoginUser };
