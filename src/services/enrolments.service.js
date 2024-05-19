const executeQuery = require("../utils/executeQuery");

const enrollStudent = async (req, res) => {
  const { student_id, course_code } = req.body;
  if (!student_id || !course_code) {
    return { statusCode: 401, data: { message: "Fields are required" } };
  }
  try {
    let query = `INSERT INTO ENROLMENTS VALUES (${student_id},${course_code})`;
    const result = await executeQuery(query);
    if (result[0].rowsAffected >= 1) {
      return {
        statusCode: 201,
        data: { message: "Student Enrolled Successfully" },
      };
    }
    return { statusCode: 201, data: { message: "An error occured" } };
  } catch (error) {
    return { statusCode: 401, data: { error: error.message } };
  }
};

const getEnrolment = async (req, res) => {
  const { student_id } = req.body;
  if (!student_id) {
    return {
      statusCode: 401,
      data: { message: "Student Id is required" },
    };
  }
  try {
    let query = `SELECT COURSES.course_code and COURSES.course_name from COURSES JOIN ENROLMENTS ON COURSES.course_code=ENROLMENT.course_code where Enrolments.student_id=${student_id}`;
    const result = await executeQuery(query);
    if (result[0].length >= 1) {
      return { statusCode: 200, data: { result } };
    }
    return {
      statusCode: 401,
      data: { message: "Record doesnot exist" },
    };
  } catch (error) {
    return { statusCode: 401, data: { error: error.message } };
  }
};
const removeEnrolment = async (req, res) => {
  const { student_id, course_code } = req.body;
  if (!student_id || !course_code) {
    return { statusCode: 401, data: { message: "Fields are required" } };
  }
  try {
    let query = `DELETE FROM ENROLMENTS WHERE student_id=${student_id} and course_code=${course_code}`;
    const result = await executeQuery(query);
    if (result[0].rowsAffected) {
      return {
        statusCode: 201,
        data: { message: "Enrolment deleted successfully" },
      };
    }
    return { statusCode: 401, data: { message: "An error occured" } };
  } catch (error) {
    return { statusCode: 401, data: { error: error.message } };
  }
};
module.exports = { getEnrolment, enrollStudent, removeEnrolment };
