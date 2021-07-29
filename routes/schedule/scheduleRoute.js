const express = require("express");
const router = express.Router();
const ScheduleController = require("../../controllers/schedules/schedulesController")

router
  .route("/")
  .get(ScheduleController.getAllClassSchedule)
  .post(ScheduleController.createClassSchedule)

router
  .route("/generateClassSchedule/:classID")
  .post(ScheduleController.generateClassSchedule)

router
  .route("/classSchedule/:classID")
  .get(ScheduleController.getClassSchedule)
  .patch(ScheduleController.updateClassSchedule)

module.exports = router