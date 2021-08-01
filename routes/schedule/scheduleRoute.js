const express = require("express");
const router = express.Router();
const ScheduleController = require("../../controllers/schedules/schedulesController")

router
  .route("/")
  .get(ScheduleController.getAllSchedule)
  .post(ScheduleController.createClassSchedule)

router
  .route("/generate")
  .post(ScheduleController.generateClassSchedule)

router
  .route("/:classID")
  .get(ScheduleController.getClassSchedule)
  .patch(ScheduleController.updateClassSchedule)

module.exports = router