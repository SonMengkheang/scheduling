const Test = require("../models/Test");
module.exports = {
  index: async (req, res, next) => {
    try {
      const test = await Test.find({});
      res.status(200).json(test);
    } catch (err) {
      next(err);
    }
  },
  createNewTest: async(req, res, next) => {
    try {
      const newTest = Test(req.body);
      const result = newTest;
      result.save();
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
};