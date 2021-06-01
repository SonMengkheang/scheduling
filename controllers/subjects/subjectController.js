const Subject = require("../../models/subjects/Subject")


module.exports = {

  index: async (req, res, next) => {
    try {
      const subject = await Subject.find({})
      res.status(200).json(subject)
    } catch (err) {
      next(err)
    }
  },

  createSubject: async(req, res, next) => {
    try {
      const newSubject = new Subject(req.body)
      newSubject.save();
      res.status(201).json(newSubject)
    } catch (err) {
      next(err);
    }
  },

}