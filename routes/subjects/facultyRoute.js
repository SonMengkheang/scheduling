const express = require("express");
const router = express.Router();
const FacultyController = require("../../controllers/subjects/facultyController");

router
  .route("/")
  .get(FacultyController.index)
  .post(FacultyController.createFaculty)
  
router
  .route("/:facultyID")
  .patch(FacultyController.updateFaculty)

module.exports = router;

