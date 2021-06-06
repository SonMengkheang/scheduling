const Role = require("../../models/users/Role");
module.exports = {

  index: async (req, res, next) => {
    try {
      const role = await Role.find({})
      res.status(200).json(role)
    } catch (err) {
      next(err);
    }
  },

  createRole: async(req, res, next) => {
    try {
      const newRole = new Role(req.body)
      newRole.save();
      res.status(201).json(newRole)
    } catch (err) {
      next(err)
    }
  },

  updateRole: async(req, res, next) => {
    try {
      const { roleID } = req.params
      const newUpdate = req.body
      const updatedRole = await Role.findByIdAndUpdate(roleID, newUpdate)
      updatedRole.save();
      res.status(201).json(updatedRole)
    } catch (err) {
      next(err);
    }
  },

};