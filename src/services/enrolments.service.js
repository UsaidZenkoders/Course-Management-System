const {executeQuery} = require("../utils/executeQuery")

const enrollStudent = async (req, res) => {
  const { email, course_code } = req.body;
  console.log(req.body)
  if (!email || !course_code) {
    return { statusCode: 401, data: { message: "Fields are required" } };
  }
  try {
    let select=`select count(*) as total from enrolments where course_code='${course_code}' and email='${email}'`
    const response=await executeQuery(select)
    console.log(response[0])

    if (response[0].total>=1){
      return {statusCode:401,data:{message:"Student already enrolled"}}
    }
    else{
      let query = `INSERT INTO ENROLMENTS VALUES ('${course_code}','${email}')`;
      console.log(query)
      const result =await executeQuery(query)
      console.log(result)
      if (result.affectedRows >= 1) {
        return {
          statusCode: 201,
          data: result,
        };
      }
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
    let query = `SELECT COURSES.course_code,COURSES.course_name from COURSES JOIN ENROLMENTS ON COURSES.course_code=ENROLMENTS.course_code where Enrolments.email='${email}'`;
    console.log(query)
    const result = await executeQuery(query);
    console.log(result.length)
    if (result.length>=1) {
      return { statusCode: 200, data:  result  };
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
