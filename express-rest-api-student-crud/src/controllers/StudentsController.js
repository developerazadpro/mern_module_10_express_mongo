const StudentsModel = require("../models/StudentsModel")


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
        res.status(200).json({})
    }
}   