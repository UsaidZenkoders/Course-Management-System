const express = require("express");
const app = express();
const cors = require("cors");
const dotenv=require("dotenv")
const AuthRouter=require("./src/routes/Auth.router")
const StudentRouter = require("./src/routes/Students.router");
const TeacherRouter = require("./src/routes/Teachers.router");
const {db}=require("./src/utils/connectToDb");
const CourseRouter = require("./src/routes/Course.router");
const { verifyJwt,checkAdmin } = require("./src/middlewares/verifyJwt");
dotenv.config()
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/student",StudentRouter)
app.use("/teacher",TeacherRouter)
app.use("/course",CourseRouter)



app.listen(PORT, async() => {
  db()
  console.log(`App is listening on PORT ${PORT}`);
});
