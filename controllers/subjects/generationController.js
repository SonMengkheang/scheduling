const Generation = require("../../models/subjects/Generation")


module.exports = {

  index: async (req, res, next) => {
    try {
      const generation = await Generation.find({})
      res.status(200).json(generation)
    } catch (err) {
      next(err)
    }
  },

  createGeneration: async(req, res, next) => {
    try {
      const newGeneration = new Generation(req.body)
      newGeneration.save();
      res.status(201).json(newGeneration)
    } catch (err) {
      next(err);
    }
  },

}