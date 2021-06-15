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
      await newDepartment.save();
      res.status(201).json(newDepartment)
    } catch (err) {
      next(err);
    }
  },

  updateDep: async(req, res, next) => {
    try {
      const { depID } = req.params
      const newUpdate = req.body
      const updatedDep = await Department.findByIdAndUpdate(depID, newUpdate)
      await updatedDep.save();
      res.status(201).json(updatedDep)
    } catch (err) {
      next(err);
    }
  },

}