const express = require("express");
const EnrolmentRouter = express.Router();
const {
  EnrollingStudent,
  RetrieveEnrolment,
  DeleteEnrolment,
  fetchCourseDetails
} = require("../controllers/Enrolment.controller");
EnrolmentRouter.post("/addEnrolment", EnrollingStudent);
EnrolmentRouter.post("/getEnrolment", RetrieveEnrolment);
EnrolmentRouter.post("/deleteEnrolment", DeleteEnrolment);
EnrolmentRouter.get("/:course_code", fetchCourseDetails);

module.exports = EnrolmentRouter;
