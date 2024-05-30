const {createCourse,updateCourse,deleteCourse, getAllCourses}=require("../services/course.service")
const CourseCreation=async(req,res)=>{
    const result=await createCourse(req,res)
   
    if (req.user && req.user.role==='admin'){
    res.status(result.statusCode).json({ message: 'Admin access granted', result: result });    }
 
}
const GetCourses=async(req,res)=>{
    const result=await getAllCourses(req,res)
    res.status(result.statusCode).json({ result: result }); 
}
const CourseUpdation=async(req,res)=>{
    const result=await updateCourse(req,res)

    if (req.user && req.user.role==='admin'){
    res.status(result.statusCode).json({ message: 'Admin access granted', result: result });    }
 
}
const CourseDeletion=async(req,res)=>{
    const result=await deleteCourse(req,res)

    if (req.user && req.user.role==='admin'){
    res.status(result.statusCode).json({ message: 'Admin access granted', result: result });    }
 
}
module.exports={CourseCreation,GetCourses,CourseUpdation,CourseDeletion}