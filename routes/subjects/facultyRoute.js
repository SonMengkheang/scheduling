const express = require("express");
const router = express.Router();
const FacultyController = require("../../controllers/subjects/facultyController");

router
  .route("/")
  .get(FacultyController.index)
  .post(FacultyController.createFaculty)
  
module.exports = router;

