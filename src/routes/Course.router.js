const express=require("express")
const CourseRouter=express.Router()
const {CourseCreation,CourseUpdation,CourseDeletion}=require("../controllers/Course.controller")
const { verifyJwt, checkAdmin } = require("../middlewares/verifyJwt")
CourseRouter.post("/",verifyJwt,checkAdmin,CourseCreation)
CourseRouter.put("/",verifyJwt,checkAdmin,CourseUpdation)
CourseRouter.delete("/",verifyJwt,checkAdmin,CourseDeletion)


module.exports=CourseRouter