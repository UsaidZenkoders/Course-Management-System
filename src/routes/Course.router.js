const express = require("express");
const CourseRouter = express.Router();
const {
  CourseCreation,
  CourseUpdation,
  CourseDeletion,
  GetCourses,
} = require("../controllers/Course.controller");
const { verifyJwt, checkAdmin } = require("../middlewares/verifyJwt");
CourseRouter.get("/",GetCourses)
CourseRouter.post("/", verifyJwt, checkAdmin, CourseCreation);
CourseRouter.put("/:id", verifyJwt, checkAdmin, CourseUpdation);
CourseRouter.delete("/:id", verifyJwt, checkAdmin, CourseDeletion);

module.exports = CourseRouter;
