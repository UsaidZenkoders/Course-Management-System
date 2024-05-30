const {executeQuery} = require("../utils/executeQuery")

const enrollStudent = async (req, res) => {
  const { email, course_code } = req.body;
  console.log(req.body)
  if (!email || !course_code) {
    return { statusCode: 401, data: { message: "Fields are required" } };
  }
  try {
    let query = `INSERT INTO ENROLMENTS VALUES ('${course_code}''${email}')`;
    console.log(query)
    const result =await executeQuery(query)
    console.log(result)
    if (result[0].rowsAffected >= 1) {
      return {
        statusCode: 201,
        data: { message: "Student Enrolled Successfully" },
      };
    }
    return { statusCode: 201, data: { message: "An error occured" } };
  } catch (error) {
    console.log(error)
    return { statusCode: 401, data: { error:error.message} };
  }
};

const getEnrolment = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return {
      statusCode: 401,
      data: { message: "Email is required" },
    };
  }
  try {
    let query = `SELECT COURSES.course_code and COURSES.course_name from COURSES JOIN ENROLMENTS ON COURSES.course_code=ENROLMENT.course_code where Enrolments.email=${email}`;
    const result = await executeQuery(query);
    if (result[0].length >= 1) {
      return { statusCode: 200, data: { result } };
    }
    console.log(result)
    return {
      statusCode: 401,
      data: { message: "Record doesnot exist" },
    };
  } catch (error) {
    return { statusCode: 401, data: { error: error.message } };
  }
};
const removeEnrolment = async (req, res) => {
  const { email, course_code } = req.body;
  if (!email || !course_code) {
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
