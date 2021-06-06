const express = require("express");
const router = express.Router();
const GenerationController = require("../../controllers/subjects/generationController");

router
  .route("/")
  .get(GenerationController.index)
  .post(GenerationController.createGeneration)
  
module.exports = router;

