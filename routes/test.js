const express = require("express");
const router = express.Router();
const TestController = require("../controllers/testController");

router
  .route("/")
  .get(TestController.index)
  .post(TestController.createNewTest)
  
module.exports = router;
