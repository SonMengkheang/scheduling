const express = require("express");
const router = express.Router();
const ScheduleController = require("../../controllers/schedules/schedulesController")

router
  .route("/classSchedule")
  .post(ScheduleController.createClassSchedule)

router
  .route("/classSchedule/:classID")
  .get(ScheduleController.getClassSchedule)
  .patch(ScheduleController.updateClassSchedule)

module.exports = router