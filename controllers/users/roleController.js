const Role = require("../../models/users/Role");
module.exports = {
  index: async (req, res, next) => {
    try {
      const role = await Role.find({});
      res.status(200).json(role);
    } catch (err) {
      next(err);
    }
  },
  createRole: async(req, res, next) => {
    try {
      const newRole = new Role(req.body);
      newRole.save();
      res.status(201).json(newRole);
    } catch (err) {
      next(err);
    }
  },
};