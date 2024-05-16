const jwt = require("jsonwebtoken");
const dotenv=require("dotenv")
dotenv.config()
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.AUTH_TOKEN_SECRET, { expiresIn: "300s" });
};


module.exports = { generateToken};
