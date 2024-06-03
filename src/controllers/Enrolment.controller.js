const {
  enrollStudent,
  getEnrolment,
  removeEnrolment,
  CourseDetails,
} = require("../services/enrolments.service");

const EnrollingStudent = async (req, res) => {
  const result = await enrollStudent(req,res);
  res.status(result.statusCode).json(result.data);
};

const RetrieveEnrolment = async (req, res) => {
  const result = await getEnrolment(req,res);
  res.status(result.statusCode).json(result.data);
};
const fetchCourseDetails = async (req, res) => {
  const result = await CourseDetails(req,res);
  res.status(result.statusCode).json(result.data);
};

const DeleteEnrolment = async (req, res) => {
  const result = await removeEnrolment(req,res);
  res.status(result.statusCode).json(result.data);
};

module.exports = { EnrollingStudent, RetrieveEnrolment, DeleteEnrolment,fetchCourseDetails };
