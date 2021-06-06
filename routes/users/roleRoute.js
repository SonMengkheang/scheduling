const express = require("express");
const router = express.Router();
const RoleController = require("../../controllers/users/userController");

router
  .route("/")
  .get(RoleController.index)
  .post(RoleController.createRole)
  

router
  .route("/:roleID")
  .patch(RoleController.updateRole)

module.exports = router
