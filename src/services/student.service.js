const { executeQuery } = require("../utils/executeQuery");
const getAllStudents=async(req,res)=>{
  let query=`SELECT name as Student_Name , email as Student_Email FROM STUDENTS`
  const result=await executeQuery(query)
  return {
    statusCode:201,
    data:{students:result}
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