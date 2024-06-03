const { executeQuery } = require("../utils/executeQuery");
const getAllStudents=async(req,res)=>{
  let query = `SELECT students.name, students.email, enrolments.course_code 
  FROM students 
  LEFT JOIN  enrolments ON students.email = enrolments.email`;
  const result=await executeQuery(query)
  return {
    statusCode:200,
    data:result
  }
}

const updateStudent=async(req,res)=>{
    const student_id=req.params.id
    const {name,email}=req.body
    if (!email || !name) {
        return {
          statusCode: 401,
          data: { message: "fields are required" },
        };
      }
    try {
        let query=`UPDATE STUDENTS SET NAME='${name}',email='${email}' where student_id=${student_id}`
        const result=await executeQuery(query)
        console.log(result)
        return {statusCode:200,data:{message:"Student updated successfully"}}
        
    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
   
}
const deleteStudent=async(req,res)=>{
    const student_id=req.params.id
    try {
        let query=`DELETE FROM STUDENT WHERE student_id=${student_id}`
        const result=await executeQuery(query)
        console.log(result)
        return {statusCode:200,data:{message:"Student deleted successfully"}}
        
    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
   
}
module.exports={getAllStudents,updateStudent,deleteStudent}