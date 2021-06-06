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
      const newFaculty = new Faculty(req.body)
      newFaculty.save();
      res.status(201).json(newFaculty)
    } catch (err) {
      next(err);
    }
  },

}