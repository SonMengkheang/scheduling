const Schedule = require('../../models/schedules/Schedule')
const User = require('../../models/users/User')
const Subject = require('../../models/subjects/Subject')
const Classes = require('../../models/classes/Classes')
const moment = require('moment')

module.exports = {

    getAllSchedule: async(req, res, next) => {
        try {
            const classSchedule = await Schedule.find({})
            res.status(201).json(classSchedule)
        } catch (err) {
            next(err)
        }
    },

    createClassSchedule: async(req, res, next) => {
        try {
            const newSchedule = req.body
            console.log("New: ", newSchedule)

            for (let j=0; j<newSchedule.schedule.monday.length; j++) {
                console.log("Monday")
                let day = newSchedule.schedule.monday
                if (newSchedule.schedule.monday[j].startTime !== null) {
                    let i_start_hour = moment(day[j].startTime)._d.getHours()
                    let i_start_minute = moment(day[j].startTime)._d.getMinutes()
                    let i_end_hour = moment(day[j].endTime)._d.getHours()
                    let i_end_minute = moment(day[j].endTime)._d.getMinutes()
                    const findTeacher = await User.findById({_id : day[j].teacher})
                    let newFreeTime = []
                    let curDay = findTeacher.freeTime.monday
                    console.log("User: ", findTeacher.username)
                    for (let k=0; k<findTeacher.freeTime.monday.length; k++) {
                        let u_start_hour = moment(findTeacher.freeTime.monday[k].startTime)._d.getHours()
                        let u_start_minute = moment(findTeacher.freeTime.monday[k].startTime)._d.getMinutes()
                        let u_end_hour = moment(findTeacher.freeTime.monday[k].endTime)._d.getHours()
                        let u_end_minute = moment(findTeacher.freeTime.monday[k].endTime)._d.getMinutes()

                        // compare state
                        if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        (i_end_hour === u_end_hour && i_end_minute === u_end_minute)) {
                            // u 7:00 -> 9:00 =
                            // i 7:00 -> 9:00
                            // Done
                            console.log("the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : curDay[k].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                        } else if ((u_end_hour === i_end_hour && u_end_minute === i_end_minute) && ((u_start_hour !== i_start_hour) || (u_start_hour === i_start_hour && u_start_minute !== i_start_minute))) {
                            // u 7:30 -> 9:30
                            // i 8:00 -> 9:30
                            console.log("Tail the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        ((u_end_hour > i_end_hour) || (u_end_hour === i_end_hour && u_end_minute !== i_end_minute))){
                            // u 7:00 -> 9:30
                            // i 7:00 -> 9:00
                            console.log("Head the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array2 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if (i_start_hour > u_end_hour || i_end_hour < u_start_hour || (i_start_hour === u_end_hour && i_start_minute !== u_end_minute) || (i_end_hour === u_start_hour && i_end_minute !== u_start_minute) || (i_start_hour === u_end_hour && i_start_minute === u_end_minute) || (i_end_hour === u_start_hour && i_end_minute === u_start_minute)){
                            // push user's new time -> new time 
                            // Done
                            console.log("Auto Add")
                            newFreeTime.push(curDay[k])
                        } else {
                            // u 7:00 -> 12:00
                            // i 8:00 -> 10:00
                            console.log("Split 3")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array3 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                            newFreeTime.push(array3)
                        }
                    }
                    findTeacher.freeTime.monday = newFreeTime
                    await findTeacher.save()
                }
                console.log("Monday Done")
            }
            for (let j=0; j<newSchedule.schedule.tuesday.length; j++) {
                console.log("Tuesday")
                let day = newSchedule.schedule.tuesday
                if (newSchedule.schedule.tuesday[j].startTime !== null) {
                    let i_start_hour = moment(day[j].startTime)._d.getHours()
                    let i_start_minute = moment(day[j].startTime)._d.getMinutes()
                    let i_end_hour = moment(day[j].endTime)._d.getHours()
                    let i_end_minute = moment(day[j].endTime)._d.getMinutes()
                    const findTeacher = await User.findById({_id : day[j].teacher})
                    let newFreeTime = []
                    let curDay = findTeacher.freeTime.tuesday

                    for (let k=0; k<findTeacher.freeTime.tuesday.length; k++) {
                        let u_start_hour = moment(findTeacher.freeTime.tuesday[k].startTime)._d.getHours()
                        let u_start_minute = moment(findTeacher.freeTime.tuesday[k].startTime)._d.getMinutes()
                        let u_end_hour = moment(findTeacher.freeTime.tuesday[k].endTime)._d.getHours()
                        let u_end_minute = moment(findTeacher.freeTime.tuesday[k].endTime)._d.getMinutes()

                        // compare state
                        if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        (i_end_hour === u_end_hour && i_end_minute === u_end_minute)) {
                            // u 7:00 -> 9:00 =
                            // i 7:00 -> 9:00
                            // Done
                            console.log("the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : curDay[k].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                        } else if ((u_end_hour === i_end_hour && u_end_minute === i_end_minute) && ((u_start_hour !== i_start_hour) || (u_start_hour === i_start_hour && u_start_minute !== i_start_minute))) {
                            // u 7:30 -> 9:30
                            // i 8:00 -> 9:30
                            console.log("Tail the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        ((u_end_hour > i_end_hour) || (u_end_hour === i_end_hour && u_end_minute !== i_end_minute))){
                            // u 7:00 -> 9:30
                            // i 7:00 -> 9:00
                            console.log("Head the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array2 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if (i_start_hour > u_end_hour || i_end_hour < u_start_hour || (i_start_hour === u_end_hour && i_start_minute !== u_end_minute) || (i_end_hour === u_start_hour && i_end_minute !== u_start_minute) || (i_start_hour === u_end_hour && i_start_minute === u_end_minute) || (i_end_hour === u_start_hour && i_end_minute === u_start_minute)){
                            // push user's new time -> new time 
                            // Done
                            console.log("Auto Add")
                            newFreeTime.push(curDay[k])
                        } else {
                            // u 7:00 -> 12:00
                            // i 8:00 -> 10:00
                            console.log("Split 3")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array3 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                            newFreeTime.push(array3)
                        }
                    }
                    findTeacher.freeTime.tuesday = newFreeTime
                    await findTeacher.save()
                }
                console.log("Tuesday Done")
            }
            for (let j=0; j<newSchedule.schedule.wednesday.length; j++) {
                console.log("Wednesday")
                let day = newSchedule.schedule.wednesday
                if (newSchedule.schedule.wednesday[j].startTime !== null) {
                    let i_start_hour = moment(day[j].startTime)._d.getHours()
                    let i_start_minute = moment(day[j].startTime)._d.getMinutes()
                    let i_end_hour = moment(day[j].endTime)._d.getHours()
                    let i_end_minute = moment(day[j].endTime)._d.getMinutes()
                    const findTeacher = await User.findById({_id : day[j].teacher})
                    let newFreeTime = []
                    let curDay = findTeacher.freeTime.wednesday

                    for (let k=0; k<findTeacher.freeTime.wednesday.length; k++) {
                        let u_start_hour = moment(findTeacher.freeTime.wednesday[k].startTime)._d.getHours()
                        let u_start_minute = moment(findTeacher.freeTime.wednesday[k].startTime)._d.getMinutes()
                        let u_end_hour = moment(findTeacher.freeTime.wednesday[k].endTime)._d.getHours()
                        let u_end_minute = moment(findTeacher.freeTime.wednesday[k].endTime)._d.getMinutes()

                        // compare state
                        if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        (i_end_hour === u_end_hour && i_end_minute === u_end_minute)) {
                            // u 7:00 -> 9:00 =
                            // i 7:00 -> 9:00
                            // Done
                            console.log("the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : curDay[k].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                        } else if ((u_end_hour === i_end_hour && u_end_minute === i_end_minute) && ((u_start_hour !== i_start_hour) || (u_start_hour === i_start_hour && u_start_minute !== i_start_minute))) {
                            // u 7:30 -> 9:30
                            // i 8:00 -> 9:30
                            console.log("Tail the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        ((u_end_hour > i_end_hour) || (u_end_hour === i_end_hour && u_end_minute !== i_end_minute))){
                            // u 7:00 -> 9:30
                            // i 7:00 -> 9:00
                            console.log("Head the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array2 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if (i_start_hour > u_end_hour || i_end_hour < u_start_hour || (i_start_hour === u_end_hour && i_start_minute !== u_end_minute) || (i_end_hour === u_start_hour && i_end_minute !== u_start_minute) || (i_start_hour === u_end_hour && i_start_minute === u_end_minute) || (i_end_hour === u_start_hour && i_end_minute === u_start_minute)){
                            // push user's new time -> new time 
                            // Done
                            console.log("Auto Add")
                            newFreeTime.push(curDay[k])
                        } else {
                            // u 7:00 -> 12:00
                            // i 8:00 -> 10:00
                            console.log("Split 3")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array3 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                            newFreeTime.push(array3)
                        }
                    }
                    findTeacher.freeTime.wednesday = newFreeTime
                    await findTeacher.save()
                }
                console.log("Wednesday Done")
            }
            for (let j=0; j<newSchedule.schedule.thursday.length; j++) {
                console.log("Thursday")
                let day = newSchedule.schedule.thursday
                if (newSchedule.schedule.thursday[j].startTime !== null) {
                    let i_start_hour = moment(day[j].startTime)._d.getHours()
                    let i_start_minute = moment(day[j].startTime)._d.getMinutes()
                    let i_end_hour = moment(day[j].endTime)._d.getHours()
                    let i_end_minute = moment(day[j].endTime)._d.getMinutes()
                    const findTeacher = await User.findById({_id : day[j].teacher})
                    let newFreeTime = []
                    let curDay = findTeacher.freeTime.thursday

                    for (let k=0; k<findTeacher.freeTime.thursday.length; k++) {
                        let u_start_hour = moment(findTeacher.freeTime.thursday[k].startTime)._d.getHours()
                        let u_start_minute = moment(findTeacher.freeTime.thursday[k].startTime)._d.getMinutes()
                        let u_end_hour = moment(findTeacher.freeTime.thursday[k].endTime)._d.getHours()
                        let u_end_minute = moment(findTeacher.freeTime.thursday[k].endTime)._d.getMinutes()

                        // compare state
                        if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        (i_end_hour === u_end_hour && i_end_minute === u_end_minute)) {
                            // u 7:00 -> 9:00 =
                            // i 7:00 -> 9:00
                            // Done
                            console.log("the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : curDay[k].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                        } else if ((u_end_hour === i_end_hour && u_end_minute === i_end_minute) && ((u_start_hour !== i_start_hour) || (u_start_hour === i_start_hour && u_start_minute !== i_start_minute))) {
                            // u 7:30 -> 9:30
                            // i 8:00 -> 9:30
                            console.log("Tail the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        ((u_end_hour > i_end_hour) || (u_end_hour === i_end_hour && u_end_minute !== i_end_minute))){
                            // u 7:00 -> 9:30
                            // i 7:00 -> 9:00
                            console.log("Head the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array2 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if (i_start_hour > u_end_hour || i_end_hour < u_start_hour || (i_start_hour === u_end_hour && i_start_minute !== u_end_minute) || (i_end_hour === u_start_hour && i_end_minute !== u_start_minute) || (i_start_hour === u_end_hour && i_start_minute === u_end_minute) || (i_end_hour === u_start_hour && i_end_minute === u_start_minute)){
                            // push user's new time -> new time 
                            // Done
                            console.log("Auto Add")
                            newFreeTime.push(curDay[k])
                        } else {
                            // u 7:00 -> 12:00
                            // i 8:00 -> 10:00
                            console.log("Split 3")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array3 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                            newFreeTime.push(array3)
                        }
                    }
                    findTeacher.freeTime.thursday = newFreeTime
                    await findTeacher.save()
                }
                console.log("Thursday Done")
            }
            for (let j=0; j<newSchedule.schedule.friday.length; j++) {
                console.log("Friday")
                let day = newSchedule.schedule.friday
                if (newSchedule.schedule.friday[j].startTime !== null) {
                    let i_start_hour = moment(day[j].startTime)._d.getHours()
                    let i_start_minute = moment(day[j].startTime)._d.getMinutes()
                    let i_end_hour = moment(day[j].endTime)._d.getHours()
                    let i_end_minute = moment(day[j].endTime)._d.getMinutes()
                    const findTeacher = await User.findById({_id : day[j].teacher})
                    let newFreeTime = []
                    let curDay = findTeacher.freeTime.friday

                    for (let k=0; k<findTeacher.freeTime.friday.length; k++) {
                        let u_start_hour = moment(findTeacher.freeTime.friday[k].startTime)._d.getHours()
                        let u_start_minute = moment(findTeacher.freeTime.friday[k].startTime)._d.getMinutes()
                        let u_end_hour = moment(findTeacher.freeTime.friday[k].endTime)._d.getHours()
                        let u_end_minute = moment(findTeacher.freeTime.friday[k].endTime)._d.getMinutes()

                        // compare state
                        if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        (i_end_hour === u_end_hour && i_end_minute === u_end_minute)) {
                            // u 7:00 -> 9:00 =
                            // i 7:00 -> 9:00
                            // Done
                            console.log("the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : curDay[k].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                        } else if ((u_end_hour === i_end_hour && u_end_minute === i_end_minute) && ((u_start_hour !== i_start_hour) || (u_start_hour === i_start_hour && u_start_minute !== i_start_minute))) {
                            // u 7:30 -> 9:30
                            // i 8:00 -> 9:30
                            console.log("Tail the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        ((u_end_hour > i_end_hour) || (u_end_hour === i_end_hour && u_end_minute !== i_end_minute))){
                            // u 7:00 -> 9:30
                            // i 7:00 -> 9:00
                            console.log("Head the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array2 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if (i_start_hour > u_end_hour || i_end_hour < u_start_hour || (i_start_hour === u_end_hour && i_start_minute !== u_end_minute) || (i_end_hour === u_start_hour && i_end_minute !== u_start_minute) || (i_start_hour === u_end_hour && i_start_minute === u_end_minute) || (i_end_hour === u_start_hour && i_end_minute === u_start_minute)){
                            // push user's new time -> new time 
                            // Done
                            console.log("Auto Add")
                            newFreeTime.push(curDay[k])
                        } else {
                            // u 7:00 -> 12:00
                            // i 8:00 -> 10:00
                            console.log("Split 3")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array3 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                            newFreeTime.push(array3)
                        }
                    }
                    findTeacher.freeTime.friday = newFreeTime
                    await findTeacher.save()
                }
                console.log("Friday Done")
            }
            for (let j=0; j<newSchedule.schedule.saturday.length; j++) {
                console.log("Saturday")
                let day = newSchedule.schedule.saturday
                if (newSchedule.schedule.saturday[j].startTime !== null) {
                    let i_start_hour = moment(day[j].startTime)._d.getHours()
                    let i_start_minute = moment(day[j].startTime)._d.getMinutes()
                    let i_end_hour = moment(day[j].endTime)._d.getHours()
                    let i_end_minute = moment(day[j].endTime)._d.getMinutes()
                    const findTeacher = await User.findById({_id : day[j].teacher})
                    let newFreeTime = []
                    let curDay = findTeacher.freeTime.saturday

                    for (let k=0; k<findTeacher.freeTime.saturday.length; k++) {
                        let u_start_hour = moment(findTeacher.freeTime.saturday[k].startTime)._d.getHours()
                        let u_start_minute = moment(findTeacher.freeTime.saturday[k].startTime)._d.getMinutes()
                        let u_end_hour = moment(findTeacher.freeTime.saturday[k].endTime)._d.getHours()
                        let u_end_minute = moment(findTeacher.freeTime.saturday[k].endTime)._d.getMinutes()

                        // compare state
                        if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        (i_end_hour === u_end_hour && i_end_minute === u_end_minute)) {
                            // u 7:00 -> 9:00 =
                            // i 7:00 -> 9:00
                            // Done
                            console.log("the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : curDay[k].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                        } else if ((u_end_hour === i_end_hour && u_end_minute === i_end_minute) && ((u_start_hour !== i_start_hour) || (u_start_hour === i_start_hour && u_start_minute !== i_start_minute))) {
                            // u 7:30 -> 9:30
                            // i 8:00 -> 9:30
                            console.log("Tail the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                        ((u_end_hour > i_end_hour) || (u_end_hour === i_end_hour && u_end_minute !== i_end_minute))){
                            // u 7:00 -> 9:30
                            // i 7:00 -> 9:00
                            console.log("Head the same")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array2 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                        } else if (i_start_hour > u_end_hour || i_end_hour < u_start_hour || (i_start_hour === u_end_hour && i_start_minute !== u_end_minute) || (i_end_hour === u_start_hour && i_end_minute !== u_start_minute) || (i_start_hour === u_end_hour && i_start_minute === u_end_minute) || (i_end_hour === u_start_hour && i_end_minute === u_start_minute)){
                            // push user's new time -> new time 
                            // Done
                            console.log("Auto Add")
                            newFreeTime.push(curDay[k])
                        } else {
                            // u 7:00 -> 12:00
                            // i 8:00 -> 10:00
                            console.log("Split 3")
                            let array1 = { 
                                startTime : curDay[k].startTime,
                                endTime : day[j].startTime,
                                status : false
                            }
                            let array2 = { 
                                startTime : day[j].startTime,
                                endTime : day[j].endTime,
                                status : true,
                                subject: day[j].subject,
                                class: newSchedule.classId,
                                room: day[j].room,
                                lectureType: day[j].type,
                                duration: day[j].duration
                            }
                            let array3 = { 
                                startTime : day[j].endTime,
                                endTime : curDay[k].endTime,
                                status : false
                            }
                            newFreeTime.push(array1)
                            newFreeTime.push(array2)
                            newFreeTime.push(array3)
                        }
                    }
                    findTeacher.freeTime.saturday = newFreeTime
                    await findTeacher.save()
                }
                console.log("Saturday Done")
            }

            // methodSchedulingFunction(newSchedule.schedule.monday , 0, "Monday")
            // methodSchedulingFunction(newSchedule.schedule.tuesday , 1, "Tuesday")
            // methodSchedulingFunction(newSchedule.schedule.wednesday , 2, "Wednesday")
            // methodSchedulingFunction(newSchedule.schedule.thursday , 3, "Thursday")
            // methodSchedulingFunction(newSchedule.schedule.friday , 4, "Friday")
            // methodSchedulingFunction(newSchedule.schedule.saturday , 5, "Saturday")

            
            console.log("Success")
            const classSchedule = new Schedule(newSchedule)
            classSchedule.save()
            res.status(201).json(classSchedule)
        } catch (err) {
            next(err)
        }
    },

    generateSchedule: async(req, res, next) => {
        try {
            const data = req.body
            const classes = await Classes.findById(data.classId)
            const subjects = await Subject.find({})
            const users = await User.find({})

            console.log("Data: ", data)
            console.log("User Subject: ", classes)
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

    generateClassSchedule: async(req, res, next) => {
        try {
            const schedule = req.body
            const findClass = await Classes.findById(schedule.classId)
            let findAllUsers = await User.find({})
            let submitSchedule = {
                monday : [{
                    startTime: findClass.shift === "M" ? moment('2021-08-05 7:00:00') : moment('2021-08-05 13:00:00'),
                    endTime: findClass.shift === "M" ? moment('2021-08-05 13:00:00') : moment('2021-08-05 18:00:00'),
                    status: false,
                    user: null,
                    subject: null,
                    duration: null,
                    labDuration: null
                }],
                tuesday : [{
                    startTime: findClass.shift === "M" ? moment('2021-08-05 7:00:00') : moment('2021-08-05 13:00:00'),
                    endTime: findClass.shift === "M" ? moment('2021-08-05 13:00:00') : moment('2021-08-05 18:00:00'),
                    status: false,
                    user: null,
                    subject: null,
                    duration: null,
                    labDuration: null
                }],
                wednesday : [{
                    startTime: findClass.shift === "M" ? moment('2021-08-05 7:00:00') : moment('2021-08-05 13:00:00'),
                    endTime: findClass.shift === "M" ? moment('2021-08-05 13:00:00') : moment('2021-08-05 18:00:00'),
                    status: false,
                    user: null,
                    subject: null,
                    duration: null,
                    labDuration: null
                }],
                thursday : [{
                    startTime: findClass.shift === "M" ? moment('2021-08-05 7:00:00') : moment('2021-08-05 13:00:00'),
                    endTime: findClass.shift === "M" ? moment('2021-08-05 13:00:00') : moment('2021-08-05 18:00:00'),
                    status: false,
                    user: null,
                    subject: null,
                    duration: null,
                    labDuration: null
                }],
                friday : [{
                    startTime: findClass.shift === "M" ? moment('2021-08-05 7:00:00') : moment('2021-08-05 13:00:00'),
                    endTime: findClass.shift === "M" ? moment('2021-08-05 13:00:00') : moment('2021-08-05 18:00:00'),
                    status: false,
                    user: null,
                    subject: null,
                    duration: null,
                    labDuration: null
                }],
                saturday : [{
                    startTime: findClass.shift === "M" ? moment('2021-08-05 7:00:00') : moment('2021-08-05 13:00:00'),
                    endTime: findClass.shift === "M" ? moment('2021-08-05 13:00:00') : moment('2021-08-05 18:00:00'),
                    status: false,
                    user: null,
                    subject: null,
                    duration: null,
                    labDuration: null
                }],
            }
            // console.log("Schedule: ", schedule)
            for (let k=0; k<schedule.userSubject.length; k++) {
                // let findTeacher = await User.findById(schedule.userSubject[k].user)
                let findTeacher = findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user))
                console.log(`Find Teacher ${k}: `, findTeacher)

                findTeacher.freeTime.monday.filter(e =>{
                    e.status = false,
                    e.shift = findClass.shift
                })
                findTeacher.freeTime.tuesday.filter(e =>{
                    e.status = false,
                    e.shift = findClass.shift
                })
                findTeacher.freeTime.wednesday.filter(e =>{
                    e.status = false,
                    e.shift = findClass.shift
                })
                findTeacher.freeTime.thursday.filter(e =>{
                    e.status = false,
                    e.shift = findClass.shift
                })
                findTeacher.freeTime.friday.filter(e =>{
                    e.status = false,
                    e.shift = findClass.shift
                })
                findTeacher.freeTime.saturday.filter(e =>{
                    e.status = false,
                    e.shift = findClass.shift
                })
                
                if(findClass.shift === "M") {
                    findTeacher.freeTime.monday.filter(e => {
                        moment(e.startTime)._d.getHours() <= 11
                    })
                    findTeacher.freeTime.tuesday.filter(e => {
                        moment(e.startTime)._d.getHours() <= 11
                    })
                    findTeacher.freeTime.wednesday.filter(e => {
                        moment(e.startTime)._d.getHours() <= 11
                    })
                    findTeacher.freeTime.thursday.filter(e => {
                        moment(e.startTime)._d.getHours() <= 11
                    })
                    findTeacher.freeTime.friday.filter(e => {
                        moment(e.startTime)._d.getHours() <= 11
                    })
                    findTeacher.freeTime.saturday.filter(e => {
                        moment(e.startTime)._d.getHours() <= 11
                    })
                } else if (findClass.shift === "A"){
                    findTeacher.freeTime.monday.filter(e => {
                        moment(e.endTime)._d.getHours() >= 15 && moment(e.endTime)._d.getHours() <= 18
                    })
                    findTeacher.freeTime.tuesday.filter(e => {
                        moment(e.endTime)._d.getHours() >= 15 && moment(e.endTime)._d.getHours() <= 18
                    })
                    findTeacher.freeTime.wednesday.filter(e => {
                        moment(e.endTime)._d.getHours() >= 15 && moment(e.endTime)._d.getHours() <= 18
                    })
                    findTeacher.freeTime.thursday.filter(e => {
                        moment(e.endTime)._d.getHours() >= 15 && moment(e.endTime)._d.getHours() <= 18
                    })
                    findTeacher.freeTime.friday.filter(e => {
                        moment(e.endTime)._d.getHours() >= 15 && moment(e.endTime)._d.getHours() <= 18
                    })
                    findTeacher.freeTime.saturday.filter(e => {
                        moment(e.endTime)._d.getHours() >= 15 && moment(e.endTime)._d.getHours() <= 18
                    })
                }

                let day = [
                    findTeacher.freeTime.monday,
                    findTeacher.freeTime.tuesday,
                    findTeacher.freeTime.wednesday,
                    findTeacher.freeTime.thursday,
                    findTeacher.freeTime.friday,
                    findTeacher.freeTime.saturday,
                ]
                let finalDay = [
                    submitSchedule.monday,
                    submitSchedule.tuesday,
                    submitSchedule.wednesday,
                    submitSchedule.thursday,
                    submitSchedule.friday,
                    submitSchedule.saturday,
                ]
                for(let i=0; i<day.length; i++){
                    // check possible assign
                    for(let j=0; j<day[i].length; j++){
                        for (let x = 0; x < finalDay[i].length; x++) {
                            if (finalDay[i][x].status === false) {
                                let u_start_hour = moment(day[i][j].startTime)._d.getHours()
                                let u_start_minute = moment(day[i][j].startTime)._d.getMinutes()
                                let u_end_hour = moment(day[i][j].endTime)._d.getHours()
                                let u_end_minute = moment(day[i][j].endTime)._d.getMinutes()
                                let i_start_hour = moment(finalDay[i][x].startTime)._d.getHours()
                                let i_start_minute = moment(finalDay[i][x].startTime)._d.getMinutes()
                                let i_end_hour = moment(finalDay[i][x].endTime)._d.getHours()
                                let i_end_minute = moment(finalDay[i][x].endTime)._d.getMinutes()
                                let finalHour = u_end_hour - u_start_hour
                                let finalMinute = ( u_end_minute - u_start_minute ) / 60
                                let compareDuration = ( finalHour + finalMinute ) * 60
                                let newFreeTime = []
                                
                                if (schedule.userSubject[k].duration > 0) {
                                    if(compareDuration >= schedule.userSubject[k].duration ){
                                        // complete for duration
                                        // time block pass schedule 
                                        // move to next element 
                                        let newTime = u_start_hour + (schedule.userSubject[k].duration / 60)
                                        let newHour = parseInt(newTime)
                                        let newMinute = ( newTime - newHour ) * 60 
                                        let finalEndTime = moment(`2021-08-05 ${newHour}:${newMinute}:00`)
                                        // console.log("Final: ", finalEndTime._d)
                                        if (i === 0) {
                                            submitSchedule.monday.push({
                                                user : schedule.userSubject[k].user,
                                                subject : schedule.userSubject[k].subject,
                                                startTime : moment(day[i][j].startTime),
                                                endTime : finalEndTime,
                                                duration: schedule.userSubject[k].duration,
                                                labDuration: schedule.userSubject[k].labDuration,
                                                status: true
                                            })
                                            let newDay = {
                                                startTime: day[i][j].startTime,
                                                endTime: day[i][j].endTime,
                                                status: true
                                            }
                                            day[i][j] = newDay
                                            findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                        } else if (i === 1) {
                                            submitSchedule.tuesday.push({
                                                user : schedule.userSubject[k].user,
                                                subject : schedule.userSubject[k].subject,
                                                startTime : moment(day[i][j].startTime),
                                                endTime : finalEndTime,
                                                duration: schedule.userSubject[k].duration,
                                                labDuration: schedule.userSubject[k].labDuration
                                            })
                                            let newDay = {
                                                startTime: day[i][j].startTime,
                                                endTime: day[i][j].endTime,
                                                status: true
                                            }
                                            day[i][j] = newDay
                                            findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                            // console.log("Submit Schedule: ", submitSchedule.tuesday)
                                        } else if (i === 2) {
                                            submitSchedule.wednesday.push({
                                                user : schedule.userSubject[k].user,
                                                subject : schedule.userSubject[k].subject,
                                                startTime : moment(day[i][j].startTime),
                                                endTime : finalEndTime,
                                                duration: schedule.userSubject[k].duration,
                                                labDuration: schedule.userSubject[k].labDuration
                                            })
                                            let newDay = {
                                                startTime: day[i][j].startTime,
                                                endTime: day[i][j].endTime,
                                                status: true
                                            }
                                            day[i][j] = newDay
                                            findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                        } else if (i === 3) {
                                            submitSchedule.thursday.push({
                                                user : schedule.userSubject[k].user,
                                                subject : schedule.userSubject[k].subject,
                                                startTime : moment(day[i][j].startTime),
                                                endTime : finalEndTime,
                                                duration: schedule.userSubject[k].duration,
                                                labDuration: schedule.userSubject[k].labDuration
                                            })
                                            let newDay = {
                                                startTime: day[i][j].startTime,
                                                endTime: day[i][j].endTime,
                                                status: true
                                            }
                                            day[i][j] = newDay
                                            findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                        } else if (i === 4) {
                                            submitSchedule.friday.push({
                                                user : schedule.userSubject[k].user,
                                                subject : schedule.userSubject[k].subject,
                                                startTime : moment(day[i][j].startTime),
                                                endTime : finalEndTime,
                                                duration: schedule.userSubject[k].duration,
                                                labDuration: schedule.userSubject[k].labDuration
                                            })
                                            let newDay = {
                                                startTime: day[i][j].startTime,
                                                endTime: day[i][j].endTime,
                                                status: true
                                            }
                                            day[i][j] = newDay
                                            findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                        } else if (i === 5) {
                                            submitSchedule.saturday.push({
                                                user : schedule.userSubject[k].user,
                                                subject : schedule.userSubject[k].subject,
                                                startTime : moment(day[i][j].startTime),
                                                endTime : finalEndTime,
                                                duration: schedule.userSubject[k].duration,
                                                labDuration: schedule.userSubject[k].labDuration
                                            })
                                            let newDay = {
                                                startTime: day[i][j].startTime,
                                                endTime: day[i][j].endTime,
                                                status: true
                                            }
                                            day[i][j] = newDay
                                            findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                        }
                                    } else {
                                        if (schedule.userSubject[k].labDuration !== undefined) {
                                            if(compareDuration > schedule.userSubject[k].labDuration ){
                                                // complete for duration
                                                // time block pass schedule 
                                                // move to next element 
                                                let newTime = u_start_hour + (schedule.userSubject[k].labDuration / 60)
                                                let newHour = parseInt(newTime)
                                                let newMinute = ( newTime - newHour ) * 60 
                                                let finalEndTime = moment(`2021-08-05 ${newHour}:${newMinute}:00`)
        
                                                if(i === 0){
                                                    submitSchedule.monday.push({
                                                        user : schedule.userSubject[k].user,
                                                        subject : schedule.userSubject[k].subject,
                                                        startTime : moment(day[i][j].startTime),
                                                        endTime : finalEndTime,
                                                        duration: schedule.userSubject[k].duration,
                                                        labDuration: schedule.userSubject[k].labDuration
                                                    })
                                                    let newDay = {
                                                        startTime: day[i][j].startTime,
                                                        endTime: day[i][j].endTime,
                                                        status: true
                                                    }
                                                    day[i][j] = newDay
                                                    findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                                } else if (i === 1) {
                                                    submitSchedule.tuesday.push({
                                                        user : schedule.userSubject[k].user,
                                                        subject : schedule.userSubject[k].subject,
                                                        startTime : moment(day[i][j].startTime),
                                                        endTime : finalEndTime,
                                                        duration: schedule.userSubject[k].duration,
                                                        labDuration: schedule.userSubject[k].labDuration
                                                    })
                                                    let newDay = {
                                                        startTime: day[i][j].startTime,
                                                        endTime: day[i][j].endTime,
                                                        status: true
                                                    }
                                                    day[i][j] = newDay
                                                    findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                                } else if (i === 2) {
                                                    submitSchedule.wednesday.push({
                                                        user : schedule.userSubject[k].user,
                                                        subject : schedule.userSubject[k].subject,
                                                        startTime : moment(day[i][j].startTime),
                                                        endTime : finalEndTime,
                                                        duration: schedule.userSubject[k].duration,
                                                        labDuration: schedule.userSubject[k].labDuration
                                                    })
                                                    let newDay = {
                                                        startTime: day[i][j].startTime,
                                                        endTime: day[i][j].endTime,
                                                        status: true
                                                    }
                                                    day[i][j] = newDay
                                                    findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                                } else if (i === 3) {
                                                    submitSchedule.thursday.push({
                                                        user : schedule.userSubject[k].user,
                                                        subject : schedule.userSubject[k].subject,
                                                        startTime : moment(day[i][j].startTime),
                                                        endTime : finalEndTime,
                                                        duration: schedule.userSubject[k].duration,
                                                        labDuration: schedule.userSubject[k].labDuration
                                                    })
                                                    let newDay = {
                                                        startTime: day[i][j].startTime,
                                                        endTime: day[i][j].endTime,
                                                        status: true
                                                    }
                                                    day[i][j] = newDay
                                                    findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                                } else if (i === 4) {
                                                    submitSchedule.friday.push({
                                                        user : schedule.userSubject[k].user,
                                                        subject : schedule.userSubject[k].subject,
                                                        startTime : moment(day[i][j].startTime),
                                                        endTime : finalEndTime,
                                                        duration: schedule.userSubject[k].duration,
                                                        labDuration: schedule.userSubject[k].labDuration
                                                    })
                                                    let newDay = {
                                                        startTime: day[i][j].startTime,
                                                        endTime: day[i][j].endTime,
                                                        status: true
                                                    }
                                                    day[i][j] = newDay
                                                    findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                                } else if (i === 5) {
                                                    submitSchedule.saturday.push({
                                                        user : schedule.userSubject[k].user,
                                                        subject : schedule.userSubject[k].subject,
                                                        startTime : moment(day[i][j].startTime),
                                                        endTime : finalEndTime,
                                                        duration: schedule.userSubject[k].duration,
                                                        labDuration: schedule.userSubject[k].labDuration
                                                    })
                                                    let newDay = {
                                                        startTime: day[i][j].startTime,
                                                        endTime: day[i][j].endTime,
                                                        status: true
                                                    }
                                                    day[i][j] = newDay
                                                    findAllUsers.find(x => String(x._id) === String(schedule.userSubject[k].user)).freeTime.monday[j] = newDay
                                                }
                                            }   
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                    // check if not yet complete assigning start new round 
                    // if(i === day.length-1){
                    //     if(schedule.userSubject[k].duration > 0 || schedule.userSubject[k].labDuration > 0){
                    //         i=0
                    //     }
                    // }
                }
            }

            // schedule.userSubject.forEach(async (e, index) =>{

            //     let findTeacher = await User.findById(e.user)
            //     console.log(`Find Teacher ${index}: `, findTeacher)

            //     findTeacher.freeTime.monday.filter(e =>{
            //         e.status = false
            //     })
            //     findTeacher.freeTime.tuesday.filter(e =>{
            //         e.status = false
            //     })
            //     findTeacher.freeTime.wednesday.filter(e =>{
            //         e.status = false
            //     })
            //     findTeacher.freeTime.thursday.filter(e =>{
            //         e.status = false
            //     })
            //     findTeacher.freeTime.friday.filter(e =>{
            //         e.status = false
            //     })
            //     findTeacher.freeTime.saturday.filter(e =>{
            //         e.status = false
            //     })
                
            //     if(findClass.shift === "M") {
            //         findTeacher.freeTime.monday.filter(e => {
            //             moment(e.endTime)._d.getHours() <= 13
            //         })
            //         findTeacher.freeTime.tuesday.filter(e => {
            //             moment(e.endTime)._d.getHours() <= 13
            //         })
            //         findTeacher.freeTime.wednesday.filter(e => {
            //             moment(e.endTime)._d.getHours() <= 13
            //         })
            //         findTeacher.freeTime.thursday.filter(e => {
            //             moment(e.endTime)._d.getHours() <= 13
            //         })
            //         findTeacher.freeTime.friday.filter(e => {
            //             moment(e.endTime)._d.getHours() <= 13
            //         })
            //         findTeacher.freeTime.saturday.filter(e => {
            //             moment(e.endTime)._d.getHours() <= 13
            //         })
            //     } else if (findClass.shift === "A"){
            //         findTeacher.freeTime.monday.filter(e => {
            //             moment(e.startTime)._d.getHours() >= 13
            //         })
            //         findTeacher.freeTime.tuesday.filter(e => {
            //             moment(e.startTime)._d.getHours() >= 13
            //         })
            //         findTeacher.freeTime.wednesday.filter(e => {
            //             moment(e.startTime)._d.getHours() >= 13
            //         })
            //         findTeacher.freeTime.thursday.filter(e => {
            //             moment(e.startTime)._d.getHours() >= 13
            //         })
            //         findTeacher.freeTime.friday.filter(e => {
            //             moment(e.startTime)._d.getHours() >= 13
            //         })
            //         findTeacher.freeTime.saturday.filter(e => {
            //             moment(e.startTime)._d.getHours() >= 13
            //         })
            //     }

            //     let day = [
            //         findTeacher.freeTime.monday,
            //         findTeacher.freeTime.tuesday,
            //         findTeacher.freeTime.wednesday,
            //         findTeacher.freeTime.thursday,
            //         findTeacher.freeTime.friday,
            //         findTeacher.freeTime.saturday,
            //     ]
            //     for(let i=0; i<day.length; i++){
            
            //         // check possible assign
            //         for(let j=0; j<day[i].length; j++){
            //             let u_start_hour = moment(day[i][j].startTime)._d.getHours()
            //             let u_start_minute = moment(day[i][j].startTime)._d.getMinutes()
            //             let u_end_hour = moment(day[i][j].endTime)._d.getHours()
            //             let u_end_minute = moment(day[i][j].endTime)._d.getMinutes()
            //             let finalHour = u_end_hour - u_start_hour
            //             let finalMinute = ( u_end_minute - u_start_minute ) / 60
            //             let compareDuration = ( finalHour + finalMinute ) * 60
                        
            //             if (e.duration > 0) {
            //                 if(compareDuration > e.duration ){
            //                     // complete for duration
            //                     // time block pass schedule 
            //                     // move to next element 
            //                     let newTime = u_start_hour + (e.duration / 60)
            //                     let newHour = parseInt(newTime)
            //                     let newMinute = ( newTime - newHour ) * 60 
            //                     if (i === 0) {
            //                         submitSchedule.monday.push({
            //                             user : e.user,
            //                             subject : e.subject,
            //                             startTime : day[i][j].startTime,
            //                             endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                         })
            //                     } else if (i === 1) {
            //                         submitSchedule.tuesday.push({
            //                             user : e.user,
            //                             subject : e.subject,
            //                             startTime : day[i][j].startTime,
            //                             endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                         })
            //                     } else if (i === 2) {
            //                         submitSchedule.wednesday.push({
            //                             user : e.user,
            //                             subject : e.subject,
            //                             startTime : day[i][j].startTime,
            //                             endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                         })
            //                     } else if (i === 3) {
            //                         submitSchedule.thursday.push({
            //                             user : e.user,
            //                             subject : e.subject,
            //                             startTime : day[i][j].startTime,
            //                             endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                         })
            //                     } else if (i === 4) {
            //                         submitSchedule.friday.push({
            //                             user : e.user,
            //                             subject : e.subject,
            //                             startTime : day[i][j].startTime,
            //                             endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                         })
            //                     } else if (i === 5) {
            //                         submitSchedule.saturday.push({
            //                             user : e.user,
            //                             subject : e.subject,
            //                             startTime : day[i][j].startTime,
            //                             endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                         })
            //                     }
            //                 } else {
            //                     if (e.labDuration !== undefined) {
            //                         if(compareDuration > e.labDuration ){
            //                             // complete for duration
            //                             // time block pass schedule 
            //                             // move to next element 
            //                             let newTime = u_start_hour + (e.labDuration / 60)
            //                             let newHour = parseInt(newTime)
            //                             let newMinute = ( newTime - newHour ) * 60 
            //                             if(i === 0){
            //                                 submitSchedule.monday.push({
            //                                     user : e.user,
            //                                     subject : e.subject,
            //                                     startTime : day[i][j].startTime,
            //                                     endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                                 })
            //                             } else if (i === 1) {
            //                                 submitSchedule.tuesday.push({
            //                                     user : e.user,
            //                                     subject : e.subject,
            //                                     startTime : day[i][j].startTime,
            //                                     endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                                 })
            //                             } else if (i === 2) {
            //                                 submitSchedule.wednesday.push({
            //                                     user : e.user,
            //                                     subject : e.subject,
            //                                     startTime : day[i][j].startTime,
            //                                     endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                                 })
            //                             } else if (i === 3) {
            //                                 submitSchedule.thursday.push({
            //                                     user : e.user,
            //                                     subject : e.subject,
            //                                     startTime : day[i][j].startTime,
            //                                     endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                                 })
            //                             } else if (i === 4) {
            //                                 submitSchedule.friday.push({
            //                                     user : e.user,
            //                                     subject : e.subject,
            //                                     startTime : day[i][j].startTime,
            //                                     endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                                 })
            //                             } else if (i === 5) {
            //                                 submitSchedule.saturday.push({
            //                                     user : e.user,
            //                                     subject : e.subject,
            //                                     startTime : day[i][j].startTime,
            //                                     endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
            //                                 })
            //                             }
            //                         }   
            //                     }
            //                 }
            //             }
                        
            //         }
            //         // check if not yet complete assigning start new round 
            //         if(i === day.length-1){
            //             if(e.duration > 0 || e.labDuration > 0){
            //                 i=0
            //             }
            //         }
            //     }
            // })

            console.log("Submit Schedule: ", submitSchedule)
            res.status(200).json(submitSchedule)


            // const classSchedule = new Schedule(newSchedule)
            // classSchedule.save()
            // res.status(201).json(classSchedule)
        } catch (err) {
            next(err)
        }
    },
}

const dayFunction = (submitSchedule, i, j, day, startHours, e) => {
    let newTime = startHours + (e.duration / 60)
    let newHour = parseInt(newTime)
    let newMinute = ( newTime - newHour ) * 60 
    if(i===0){
        submitSchedule.monday.push({
            user : e.user,
            subject : e.subject,
            startTime : day[i][j].startTime,
            endTime : moment(`2021-08-05 ${newHour}:${newMinute}:00`),
        })
    }
}

const methodSchedulingFunction = async (day, i, date) => {
    for(let j=0; i<day.length; j++){
        console.log("J: ", j)
        console.log("Date: ", date)
        console.log("Start Time", moment(day[j].startTime)._d.getHours())
        if (day[j].startTime !== null) {
            let i_start_hour = moment(day[j].startTime)._d.getHours()
            let i_start_minute = moment(day[j].startTime)._d.getMinutes()
            let i_end_hour = moment(day[j].endTime)._d.getHours()
            let i_end_minute = moment(day[j].endTime)._d.getMinutes()
            const findTeacher = await User.findById({_id : day[j].teacher})
            let curDay = []
            let newFreeTime = []
            if(i=0) {
                curDay = findTeacher.freeTime.monday   
            } else if(i===1) {
                curDay = findTeacher.freeTime.tuesday   
            } else if(i===2) {
                curDay = findTeacher.freeTime.wednesday   
            } else if(i===3) {
                curDay = findTeacher.freeTime.thursday   
            } else if(i===4) {
                curDay = findTeacher.freeTime.friday   
            } else if(i===5) {
                curDay = findTeacher.freeTime.saturday   
            }
            for(let k=0; k<curDay.length; k++){
                let u_start_hour = moment(curDay[k].startTime)._d.getHours()
                let u_start_minute = moment(curDay[k].startTime)._d.getMinutes()
                let u_end_hour = moment(curDay[k].endTime)._d.getHours()
                let u_end_minute = moment(curDay[k].endTime)._d.getMinutes()
                // compare state
                if ((i_start_hour === u_start_hour && i_start_minute === u_start_minute) && 
                (i_end_hour === u_end_hour && i_end_minute === u_end_minute)) {
                    // u 7:00 -> 9:00 =
                    // i 7:00 -> 9:00
                    // Done
                    let array1 = { 
                        startTime : curDay[k].startTime,
                        endTime : curDay[k].endTime,
                        status : true
                    }
                    newFreeTime.push(array1)
                } else if (u_end_hour === i_end_hour && u_end_minute === i_end_minute && i_start_hour !== u_start_hour && i_start_minute !== u_start_minute) {
                    // u 7:30 -> 9:30
                    // i 8:00 -> 9:30
                    let array1 = { 
                        startTime : curDay[k].startTime,
                        endTime : day[j].startTime,
                        status : false
                    }
                    let array2 = { 
                        startTime : day[j].startTime,
                        endTime : day[j].endTime,
                        status : true
                    }
                    newFreeTime.push(array1)
                    newFreeTime.push(array2)
                } else if (i_start_hour === u_start_hour && i_start_minute === u_start_minute && 
                i_end_hour !== u_end_hour && i_end_minute !== u_end_minute){
                    // u 7:00 -> 9:30
                    // i 7:00 -> 9:00
                    let array1 = { 
                        startTime : curDay[k].startTime,
                        endTime : day[j].endTime,
                        status : true
                    }
                    let array2 = { 
                        startTime : day[j].endTime,
                        endTime : curDay[k].endTime,
                        status : false
                    }
                    newFreeTime.push(array1)
                    newFreeTime.push(array2)
                } else if ((i_start_hour === u_start_hour && i_start_minute !== u_start_minute ) || (i_start_hour > u_start_hour)){
                    // push user's new time -> new time 
                    // Done
                    newFreeTime.push(curDay[k])
                } else {
                    // u 7:00 -> 12:00
                    // i 8:00 -> 10:00
                    let array1 = { 
                        startTime : curDay[k].startTime,
                        endTime : day[j].startTime,
                        status : false
                    }
                    let array2 = { 
                        startTime : day[j].startTime,
                        endTime : day[j].endTime,
                        status : true
                    }
                    let array3 = { 
                        startTime : day[j].endTime,
                        endTime : curDay[k].endTime,
                        status : false
                    }
                    newFreeTime.push(array1)
                    newFreeTime.push(array2)
                    newFreeTime.push(array3)
                }
            }
            curDay = newFreeTime
            await findTeacher.save()
        }
    }
}