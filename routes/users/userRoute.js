const express = require("express")
const router = express.Router()
const upload = require("../../helpers/imageHelpers")
const UserController = require("../../controllers/users/userController")

router
  .route("/")
  .get(UserController.allowIfLoggedin, UserController.index)
  .post(UserController.login)

router
  .route("/:userID")
  // .get(UserController.allowIfLoggedin, UserController.getUserById)
  .patch(UserController.allowIfLoggedin, UserController.updateUser)

router
  .route("/create")
  .post(UserController.allowIfLoggedin, UserController.createUser)

router
  .route("/profile")
  .get(UserController.allowIfLoggedin, UserController.getOwnProfile)

router
  .route("/profile/update")
  .patch(UserController.allowIfLoggedin, UserController.updateOwnProfile)

router
  .route("/setImg")
  .post(upload.single('userImage'), UserController.setImagePath)
  .patch(upload.single('userImage'), UserController.updateImagePath)

module.exports = router
