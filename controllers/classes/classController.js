const Classes = require("../../models/classes/Classes")
const Schedule = require("../../models/schedules/Schedule")


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

  updateClass: async(req, res, next) => {
    try {
      const { classID } = req.params
      const newUpdate = req.body
      const updatedClass = await Classes.findByIdAndUpdate(classID, newUpdate)
      updatedClass.save();
      res.status(201).json(updatedClass)
    } catch (err) {
      next(err);
    }
  },

  createClassSchedule: async(req, res, next) => {
    try {
      const newSchedule = req.body
      const classSchedule = new Schedule(newSchedule)
      classSchedule.save()
      res.status(201).json(classSchedule)
    } catch (err) {
      next(err);
    }
  },

  getClassSchedule: async(req, res, next) => {
    try {
      const { classID } = req.params
      const classSchedule = await Schedule.findById(classID)
      res.status(201).json(classSchedule)
    } catch (err) {
      next(err);
    }
  },

  updateClassSchedule: async(req, res, next) => {
    try {
      const { classID } = req.params
      const newClassSchedule = req.body
      const classSchedule = await Schedule.findByIdAndUpdate(classID, newClassSchedule)
      res.status(201).json(classSchedule)
    } catch (err) {
      next(err);
    }
  },

}