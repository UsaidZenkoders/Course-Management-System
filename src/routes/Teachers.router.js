
const express = require("express");
const TeacherRouter = express.Router();
const {AllInstructors,updateInstructor,deleteInstructor } = require("../controllers/Teachers.controller");
TeacherRouter.get("/", AllInstructors);
TeacherRouter.put("/:id",updateInstructor)
TeacherRouter.delete("/:id",deleteInstructor)

module.exports = TeacherRouter;
