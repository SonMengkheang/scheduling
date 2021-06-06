const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/users/userController");

router
  .route("/")
  .get(UserController.index)
  .post(UserController.createUser)

router
  .route("/:userID")
  .patch(UserController.updateUser)
  
module.exports = router;
