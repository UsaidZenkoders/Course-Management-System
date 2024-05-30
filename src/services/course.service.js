const {executeQuery}=require("../utils/executeQuery")

const createCourse=async(req,res)=>{
    const {course_code,course_name,description}=req.body
    if(!course_code || !course_name || !description){
        return {statusCode:401,message:"All fields are required"}
    }
    try {
        let query=`INSERT INTO courses values ('${course_code}','${course_name}','${description}')`
        const result=await executeQuery(query)
        console.log(result)
        return { statusCode: 201, message: "Course created successfully", courseCode: course_code };

    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
}

const getAllCourses=async(req,res)=>{
    try {
        let query=`SELECT * FROM COURSES`
        const result=await executeQuery(query)
        console.log(result)
        return { statusCode: 201, data:result};

    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
}

const updateCourse=async(req,res)=>{
    const {course_name,description,course_code}=req.body
    
    if( !course_name || !description){
        return {statusCode:401,message:"All fields are required"}
    }
    try {
        let query=`UPDATE courses set course_name='${course_name}',description='${description}' where course_code='${course_code}'`
        const result=await executeQuery(query)
  
        return { statusCode: 200, message: "Course updated successfully", courseCode: course_code };

    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
}
const deleteCourse=async(req,res)=>{
    const course_code=req.params.id
    console.log(course_code)
    try {
        let query=`DELETE FROM courses where course_code='${course_code}' `
        // console.log(query)
        const result=await executeQuery(query)
        console.log(result)
   if(result.affectedRows===1){
       return { statusCode: 200, message: "Course deleted successfully", courseCode: course_code };
       
   }
   else{
    return{statusCode:200,message:"Course doesnot exist"}
   }

    } catch (error) {
        return {statusCode:401,data:{message:"Error Occured"}}
    }
}

module.exports={createCourse,getAllCourses,updateCourse,deleteCourse}