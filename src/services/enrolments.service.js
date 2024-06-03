const {executeQuery} = require("../utils/executeQuery")

const enrollStudent = async (req, res) => {
  const { email, course_code } = req.body;
  console.log(req.body)
  if (!email || !course_code) {
    return { statusCode: 401, data: { message: "Fields are required" } };
  }
  try {
  
    let courseQuery = `SELECT COUNT(*) AS total FROM courses WHERE course_code='${course_code}'`;
    const courseResponse = await executeQuery(courseQuery);
    console.log(courseResponse[0]);

    if (courseResponse[0].total === 0) {
      return { statusCode: 401, data: { message: "Course does not exist" } };
    }

  
    let enrollQuery = `SELECT COUNT(*) AS total FROM enrolments WHERE course_code='${course_code}' AND email='${email}'`;
    const enrollResponse = await executeQuery(enrollQuery);
    console.log(enrollResponse[0]);

    if (enrollResponse[0].total >= 1) {
      return { statusCode: 401, data: { message: "Student already enrolled" } };
    } else {
      let query = `INSERT INTO enrolments VALUES ('${course_code}', '${email}')`;
      console.log(query);
      const result = await executeQuery(query);
      console.log(result);
      if (result.affectedRows >= 1) {
        return {
          statusCode: 201,
          data: result,
        };
      }
    }
    return { statusCode: 201, data: { message: "An error occurred" } };
  } catch (error) {
    console.log(error);
    return { statusCode: 401, data: { error: error.message } };
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
    let query = `DELETE FROM ENROLMENTS WHERE email='${email}' and course_code='${course_code}'`;
    const result = await executeQuery(query);
    console.log(result)
    if (result.affectedRows>=1) {
      return {
        statusCode: 200,
        data: { message: "Enrolment deleted successfully" },
      };
    }
    return { statusCode: 401, data: { message: "Error while deleting " } };
  } catch (error) {
    return { statusCode: 401, data: { error: error.message } };
  }
};
const CourseDetails=async(req,res)=>{
  const course_code=req.params.course_code
  if (!course_code){
    return {statusCode:401,data:{message:"Course Code doesnot exist"}}
  }
  try {
    let query=`SELECT course_name from courses where course_code='${course_code}'`
    const result=await executeQuery(query)
    console.log(result)
  return{statusCode:200,data:result[0]}
    
  } catch (error) {
    return {
      statusCode:401,data:{message:"An error occured "}
    }
  }
}
module.exports = { getEnrolment, enrollStudent, removeEnrolment,CourseDetails };
