const { executeQuery } = require("../utils/executeQuery");
const getAllTeachers=async(req,res)=>{
  let query=`SELECT name as Teacher_Name , email as Teacher_Email FROM TEACHERS`
  const result=await executeQuery(query)
  return {
    statusCode:201,
    data:{students:result}
  }
}

const updateTeacher=async(req,res)=>{
    const teacher_id=req.params.id
    const {name,email}=req.body
    if (!email || !name) {
        return {
          statusCode: 401,
          data: { message: "fields are required" },
        };
      }
    try {
        let query=`UPDATE TEACHERS SET NAME='${name}',email='${email}' where teacher_id=${teacher_id}`
        const result=await executeQuery(query)
        return {statusCode:200,data:{message:"Teacher updated successfully"}}
        
    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
   
}
const deleteTeacher=async(req,res)=>{
    const teacher_id=req.params.id
    try {
        let query=`DELETE FROM TEACHERS WHERE teacher_id=${teacher_id}`
        const result=await executeQuery(query)
        return {statusCode:200,data:{message:"Teacher deleted successfully"}}
        
    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
   
}
module.exports={getAllTeachers,updateTeacher,deleteTeacher}