const express = require("express");
const router = express.Router();
const RoleController = require("../../controllers/users/userController");

router
  .route("/")
  .get(RoleController.index)
  .post(RoleController.createRole)
  
module.exports = router;
