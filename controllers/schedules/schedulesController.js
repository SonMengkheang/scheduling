const Schedule = require('../../models/schedules/Schedule')
const moment = require('moment')

module.exports = {

    getAllSchedule: async(req, res, next) => {
        try {
            let time = moment('2021-07-17 7:00:00')
            console.log("Time: ", time._d.getHours())
        } catch (err) {
            next(err)
        }
    },

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