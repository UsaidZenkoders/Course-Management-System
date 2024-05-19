const {
  enrollStudent,
  getEnrolment,
  removeEnrolment,
} = require("../services/enrolments.service");

const EnrollingStudent = async (req, res) => {
  const result = await enrollStudent();
  res.status(result.statusCode).json(result.data);
};

const RetrieveEnrolment = async (req, res) => {
  const result = await getEnrolment();
  res.status(result.statusCode).json(result.data);
};

const DeleteEnrolment = async (req, res) => {
  const result = await removeEnrolment();
  res.status(result.statusCode).json(result.data);
};

module.exports = { EnrollingStudent, RetrieveEnrolment, DeleteEnrolment };
