const Classes = require("../../models/classes/Classes")


module.exports = {

  index: async (req, res, next) => {
    try {
      const classes = await Classes.find({})
      res.status(200).json(classes)
    } catch (err) {
      next(err)
    }
  },

  createClass: async(req, res, next) => {
    try {
      const newclass = new Classes(req.body)
      newclass.save();
      res.status(201).json(newclass)
    } catch (err) {
      next(err);
    }
  },

}