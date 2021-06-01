const express = require("express");
const router = express.Router();
const DepartmentController = require("../../controllers/subjects/departmentController");

router
  .route("/")
  .get(DepartmentController.index)
  .post(DepartmentController.createDepartment)
  
module.exports = router;

