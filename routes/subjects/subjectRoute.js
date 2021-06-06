const express = require("express");
const router = express.Router();
const SubjectController = require("../../controllers/subjects/subjectController");

router
  .route("/")
  .get(SubjectController.index)
  .post(SubjectController.createSubject)
  
router
  .route("/:subjectID")
  .patch(SubjectController.updateSubject)
  
module.exports = router;

