const express = require("express");
const app = express();
const cors = require("cors");
const dotenv=require("dotenv")
const LoginRouter = require("./src/routes/Register.router");
const RegisterRouter = require("./src/routes/Login.router");
const {db}=require("./src/utils/connectToDb");
dotenv.config()
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/", LoginRouter);
app.use("/", RegisterRouter);


app.listen(PORT, async() => {
  db()
  console.log(`App is listening on PORT ${PORT}`);
});
