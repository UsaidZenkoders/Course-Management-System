const express = require("express");
const EnrolmentRouter = express.Router();
const {
  EnrollingStudent,
  RetrieveEnrolment,
  DeleteEnrolment,
} = require("../controllers/Enrolment.controller");
EnrolmentRouter.post("/addEnrolment", EnrollingStudent);
EnrolmentRouter.post("/getEnrolment", RetrieveEnrolment);
EnrolmentRouter.delete("/", DeleteEnrolment);
module.exports = EnrolmentRouter;
