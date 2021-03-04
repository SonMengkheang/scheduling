const User = require("../../models/users/User");
module.exports = {
  index: async (req, res, next) => {
    try {
      const user = await User.find({});
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },
  createNewTest: async(req, res, next) => {
    try {
      const newUser = User(req.body);
      const result = newUser;
      result.save();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
};