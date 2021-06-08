const Faculty = require("../../models/subjects/Faculty")


module.exports = {

  index: async (req, res, next) => {
    try {
      const faculty = await Faculty.find({})
      res.status(200).json(faculty)
    } catch (err) {
      next(err)
    }
  },

  createFaculty: async(req, res, next) => {
    try {
      const newFaculty = req.body
      const createNew = new Faculty(newFaculty)
      console.log("newFa : ", newFaculty)
      //await createNew.save()
      //res.status(201).json(createNew)
    } catch (err) {
      next(err);
    }
  },

  updateFaculty: async(req, res, next) => {
    try {
      const { facultyID } = req.params
      const newUpdate = req.body
      const updatedFaculty = await Faculty.findByIdAndUpdate(facultyID, newUpdate)
      updatedFaculty.save();
      res.status(201).json(updatedFaculty)
    } catch (err) {
      next(err);
    }
  },

}