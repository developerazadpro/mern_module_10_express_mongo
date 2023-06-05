const StudentsModel = require("../models/StudentsModel")

// read students 
exports.getAllStudents = async(req, res) => {
    const query = {}
    const projection = "name class roll"
    try{
        const students = await StudentsModel.find({})
        if(students){
            res.status(200).json({
                status: "success",
                data: students
            })
        }else{
            res.status(200).json({
                status: "success",
                data: "Data not found"
            })
        }
    }catch(error){
        console.log("Error fetching students", error)
        res.status(200).json({
            status: "success",
            data: "Data not found"
        })
    }
}   

// read single student 
exports.getStudent = async(req, res) => {
    try{
        const student = await StudentsModel.findById(req.params.id)
        if(student){
            res.status(200).json({
                status: "success",
                data: student
            })
        }else{
            res.status(200).json({
                status: "success",
                data: "Data not found"
            })
        }
    }catch(error){
        console.log("Error fetching student", error)
        res.status(200).json({
            status: "success",
            data: "Data not found"
        })
    }
} 
// save student
exports.saveStudent = async(req, res) => {
    try{
        const student = new StudentsModel(req.body)
        const savedStudent = await student.save()
        if(savedStudent){
            res.status(200).json({
                status: "success",
                data: savedStudent
            })
        }
    }catch(error){
        console.log("Error saving student", error)
        res.status(200).json({
            status: "failed",
            data: "Error Saving Student"
        })
    }
} 
