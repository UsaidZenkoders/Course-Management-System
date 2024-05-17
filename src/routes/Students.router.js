
const express = require("express");
const StudentRouter = express.Router();
const { AllStudents,updateStd,deleteStd } = require("../controllers/Students.controller");
StudentRouter.get("/", AllStudents);
StudentRouter.put("/:id",updateStd)
StudentRouter.delete("/:id",deleteStd)

module.exports = StudentRouter;
