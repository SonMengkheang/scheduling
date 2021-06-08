const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/users/userController");

router
  .route("/")
  .get(UserController.index)
  .post(UserController.login)

router
  .route("/:userID")
  .patch(UserController.updateUser)

router
  .route("/create")
  .post(UserController.createUser)

router
  .route("/profile")
  .get(UserController.getOwnProfile)
  .patch(UserController.updateOwnProfile)
  
module.exports = router;
