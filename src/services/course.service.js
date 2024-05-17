const {executeQuery}=require("../utils/executeQuery")

const createCourse=async(req,res)=>{
    const {course_code,course_name,course_description}=req.body
    if(!course_code || !course_name || !course_description){
        return {statusCode:401,message:"All fields are required"}
    }
    try {
        let query=`INSERT INTO courses values ('${course_code}','${course_name}','${course_description}')`
        const result=await executeQuery(query)
        console.log(result)
        return { statusCode: 201, message: "Course created successfully", courseCode: course_code };

    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
}

const updateCourse=async(req,res)=>{
    const {course_code,course_name,course_description}=req.body
    if(!course_code || !course_name || !course_description){
        return {statusCode:401,message:"All fields are required"}
    }
    try {
        let query=`UPDATE courses values ('${course_name}','${course_description}') where course_code=${course_code}`
        const result=await executeQuery(query)
  
        return { statusCode: 200, message: "Course updated successfully", courseCode: course_code };

    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
}
const deleteCourse=async(req,res)=>{
    const course_code=req.params
    if(!course_code || !course_name || !course_description){
        return {statusCode:401,message:"All fields are required"}
    }
    try {
        let query=`UPDATE FROM courses where course_code=${course_code} `
        const result=await executeQuery(query)
   
        return { statusCode: 200, message: "Course deleted successfully", courseCode: course_code };

    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
}

module.exports={createCourse,updateCourse,deleteCourse}