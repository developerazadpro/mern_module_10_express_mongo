const mongoose = require("mongoose")
const StudentSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    class:{
        type: String,
        required:true
    },
    roll:{
        type: Number,
        required:true
    },
    remarks:{
        type: String
    }
})

const StudentsModel = mongoose.model('students', StudentSchema)
module.exports = StudentsModel;