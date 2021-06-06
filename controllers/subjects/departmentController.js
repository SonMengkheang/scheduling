const Department = require("../../models/subjects/Department")


module.exports = {

  index: async (req, res, next) => {
    try {
      const department = await Department.find({})
      res.status(200).json(department)
    } catch (err) {
      next(err)
    }
  },

  createDepartment: async(req, res, next) => {
    try {
      const newDepartment = new Department(req.body)
      newDepartment.save();
      res.status(201).json(newDepartment)
    } catch (err) {
      next(err);
    }
  },

}