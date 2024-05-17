const {getAllStudents, updateStudent, deleteStudent}=require("../services/student.service")

const AllStudents = async (req, res) => {
  const result = await getAllStudents(req, res);
  res.status(result.statusCode).json(result.data);
};

const updateStd=async (req,res)=>{
    const result=await updateStudent(req,res)
    res.status(result.statusCode).json(result.data)
}

const deleteStd=async (req,res)=>{
    const result=await deleteStudent(req,res)
    res.status(result.statusCode).json(result.data)
}
module.exports = { AllStudents,updateStd,deleteStd };