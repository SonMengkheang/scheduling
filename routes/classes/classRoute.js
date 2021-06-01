const express = require("express");
const router = express.Router();
const ClassController = require("../../controllers/classes/classController");

router
  .route("/")
  .get(ClassController.index)
  .post(ClassController.createClass)
  
module.exports = router;

