const {createCourse,updateCourse,deleteCourse}=require("../services/course.service")
const CourseCreation=async(req,res)=>{
    const result=await createCourse(req,res)
   
    if (req.user && req.user.is_Admin){
    res.status(result.statusCode).json({ message: 'Admin access granted', result: result });    }
 
}
const CourseUpdation=async(req,res)=>{
    const result=await updateCourse(req,res)

    if (req.user && req.user.is_Admin){
    res.status(result.statusCode).json({ message: 'Admin access granted', result: result });    }
 
}
const CourseDeletion=async(req,res)=>{
    const result=await deleteCourse(req,res)

    if (req.user && req.user.is_Admin){
    res.status(result.statusCode).json({ message: 'Admin access granted', result: result });    }
 
}
module.exports={CourseCreation,CourseUpdation,CourseDeletion}