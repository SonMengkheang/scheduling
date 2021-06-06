const Role = require("../../models/users/Role")
const User = require("../../models/users/User")

module.exports = {

  index: async (req, res, next) => {
    try {
      const user = await User.find({})
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },

  createUser: async(req, res, next) => {
    try {
      const newUser = new User(req.body)
      newUser.save();
      res.status(201).json(newUser)
    } catch (err) {
      next(err)
    }
  },

  updateUser: async(req, res, next) => {
    try {
      const { userID } = req.params
      const newUpdate = req.body
      const updatedUser = await User.findByIdAndUpdate(userID, newUpdate)
      updatedUser.save();
      res.status(201).json(updatedUser)
    } catch (err) {
      next(err);
    }
  },

}