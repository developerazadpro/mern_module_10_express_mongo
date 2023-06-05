const express = require("express")
const StudentsController = require("../controllers/StudentsController")



const router = express.Router()


router.get("/students", StudentsController.getAllStudents)

module.exports = router