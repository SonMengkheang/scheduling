const express = require("express");
const router = express.Router();
const ClassController = require("../../controllers/classes/classController");

router
  .route("/")
  .get(ClassController.index)
  .post(ClassController.createClass)

router
  .route("/classSchedule")
  .post(ClassController.createClassSchedule)

router
  .route("/classSchedule/:classID")
  .get(ClassController.getClassSchedule)
  .patch(ClassController.updateClassSchedule)
 
 
router
  .route("/:classID")
  .patch(ClassController.updateClass)
  
module.exports = router;

