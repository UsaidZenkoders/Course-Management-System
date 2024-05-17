const {getAllTeachers, updateTeacher, deleteTeacher}=require("../services/teachers.service")

const AllInstructors = async (req, res) => {
  const result = await getAllTeachers(req, res);
  res.status(result.statusCode).json(result.data);
};

const updateInstructor=async (req,res)=>{
    const result=await updateTeacher(req,res)
    res.status(result.statusCode).json(result.data)
}

const deleteInstructor=async (req,res)=>{
    const result=await deleteTeacher(req,res)
    res.status(result.statusCode).json(result.data)
}
module.exports = { AllInstructors,updateInstructor,deleteInstructor };