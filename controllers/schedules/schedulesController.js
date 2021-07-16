const Schedule = require('../../models/schedules/Schedule')

module.exports = {
    createClassSchedule: async(req, res, next) => {
        try {
            const newSchedule = req.body
            const classSchedule = new Schedule(newSchedule)
            classSchedule.save()
            res.status(201).json(classSchedule)
        } catch (err) {
            next(err)
        }
    },
    
    getClassSchedule: async(req, res, next) => {
        try {
            const { classID } = req.params
            const classSchedule = await Schedule.findById(classID)
            res.status(201).json(classSchedule)
        } catch (err) {
            next(err)
        }
    },
    
    updateClassSchedule: async(req, res, next) => {
        try {
            const { classID } = req.params
            const newClassSchedule = req.body
            const classSchedule = await Schedule.findByIdAndUpdate(classID, newClassSchedule)
            res.status(201).json(classSchedule)
        } catch (err) {
            next(err)
        }
    },
}