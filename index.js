const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const AuthRouter = require("./src/routes/Auth.router");
const StudentRouter = require("./src/routes/Students.router");
const TeacherRouter = require("./src/routes/Teachers.router");
const EnrolmentRouter = require("./src/routes/Enrolments.router");
const { db } = require("./src/utils/connectToDb");
const CourseRouter = require("./src/routes/Course.router");
dotenv.config();
const PORT = 3100;

app.use(cors());
app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/student", StudentRouter);
app.use("/teacher", TeacherRouter);
app.use("/course", CourseRouter);
app.use("/enrolments", EnrolmentRouter);

app.listen(PORT, async () => {
  db();
  console.log(`App is listening on PORT ${PORT}`);
});
