import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Row, Col, Button, DatePicker, Select, Input, TimePicker } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'
import { BiDownArrow, BiRightArrow } from 'react-icons/bi'
import moment from 'moment'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import ScheduleTableTemplate from '../../../components/ScheduleTableTemplate'

const CreateSchedule = () => {

    const history = useHistory()
    const { Option } = Select
    const { RangePicker } = DatePicker

    const [classes, setClasses] = useState(null)
    const [classId, setClassId] = useState(null)
    const [generation, setGeneration] = useState(null)
    const [genId, setGenId] = useState(null)
    const [department, setDepartment] = useState(null)
    const [departId, setDepartId] = useState(null)
    const [faculty, setFaculty] = useState(null)
    const [facId, setFacId] = useState(null)

    const [departByFaculty, setDepartByFaculty] = useState(null)
    const [generationByDepart, setGenerationByDepart] = useState(null)
    const [classByGen, setClassByGen] = useState(null)

    const [users, setUsers] = useState(null)
    const [infoOpen, setInfoOpen] = useState(true)
    const [scheduleOpen, setScheduleOpen] = useState(true)

    const [classInfo, setClassInfo] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const [userSubject, setUserSubject] = useState(null)

    const [isOpen, setIsOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    const [day, setDay] = useState(null)
    const [shift, setShift] = useState(null)

    const [selectedTimeRange, setSelectedTimeRange] = useState({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
    })

    const [monday, setMonday] = useState([
        {
            startTime: null,
            endTime: null,
            subject: null,
            subjectName: null,
            type: null,
            teacher: null,
            teacherName: null,
            duration: null,
            room: null
        }
    ])
    const [tuesday, setTuesday] = useState([
        {
            startTime: null,
            endTime: null,
            subject: null,
            subjectName: null,
            type: null,
            teacher: null,
            teacherName: null,
            duration: null,
            room: null
        }
    ])
    const [wednesday, setWednesday] = useState([
        {
            startTime: null,
            endTime: null,
            subject: null,
            subjectName: null,
            type: null,
            teacher: null,
            teacherName: null,
            duration: null,
            room: null
        }
    ])
    const [thursday, setThursday] = useState([
        {
            startTime: null,
            endTime: null,
            subject: null,
            subjectName: null,
            type: null,
            teacher: null,
            teacherName: null,
            duration: null,
            room: null
        }
    ])
    const [friday, setFriday] = useState([
        {
            startTime: null,
            endTime: null,
            subject: null,
            subjectName: null,
            type: null,
            teacher: null,
            teacherName: null,
            duration: null,
            room: null
        }
    ])
    const [saturday, setSaturday] = useState([
        {
            startTime: null,
            endTime: null,
            subject: null,
            subjectName: null,
            type: null,
            teacher: null,
            teacherName: null,
            duration: null,
            room: null
        }
    ])

    const [schedules, setSchedules] = useState(null)

    useEffect(() => {
        baseAPI.get('/classes')
        .then(res => {
            setClasses(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('/generations')
        .then(res => {
            setGeneration(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('/departments')
        .then(res => {
            setDepartment(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('/faculties')
        .then(res => {
            setFaculty(res.data)
            setFacId(res.data[0]._id)
        })
        .catch(err => console.log(err))

        baseAPI.get('/users')
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('/subjects')
        .then(res => {
            setSubjects(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (department !== null && department.length > 0 && facId !== null) {
            let arr = []
            department.map(res => {
                if (res.faculty === facId) {
                    arr.push(res)
                }
            })
            console.log("arr: ", arr)
            if (arr.length === 0) {
                setDepartByFaculty(arr)
                setDepartId("default")
            } else {
                setDepartId(arr[0]._id)
                setDepartByFaculty(arr)
            }
        }
    }, [facId, department])

    useEffect(() => {
        if (generation !== null && generation.length > 0 && departId !== null) {
            let arr = []
            generation.map(res => {
                if (res.department === departId) {
                    arr.push(res)
                }
            })
            console.log("arr: ", arr)
            if (arr.length === 0) {
                setGenerationByDepart(arr)
                setGenId("default")
            } else {
                setGenerationByDepart(arr)
                setGenId(arr[0]._id)
            }
        }
    }, [departId, generation])

    useEffect(() => {
        if (classes !== null && classes.length > 0 && genId !== null) {
            let arr = []
            classes.map(res => {
                if (res.generation === genId) {
                    arr.push(res)
                }
            })
            console.log("arr: ", arr)
            if (arr.length === 0) {
                setClassByGen(arr)
                setClassId("default")
            } else {
                setClassByGen(arr)
                setClassId(arr[0]._id)
            }
        }
    }, [genId, classes])

    useEffect(() => {
        if (classId !== null && classByGen !== null && users !== null && subjects !== null) {
            console.log("Class ID: ", classId)
            console.log("classByGen: ", classByGen)
            console.log("users: ", users)
            console.log("subjects: ", subjects)
            let obj = classByGen.find(x => x._id === classId)
            console.log("UserSubject: ", obj)
            let arr = []
            obj.userSubject.map(res => {
                let u = users.find(x => x._id === res.user)
                let s = subjects.find(x => x._id === res.subject)
                arr.push({
                    subjectName: s.subjectName,
                    subjectId: s._id,
                    duration: s.duration,
                    credit: s.credit,
                    hasLab: s.hasLab,
                    labDuration: s.labDuration,
                    lecName: u.username,
                    lecId: u._id,
                    freeTime: u.freeTime,
                    shift: res.shift
                })
            })
            setClassInfo(obj)
            setUserSubject(arr)
            setShift(obj.shift)
        }
    }, [classId, subjects, users, classByGen])

    useEffect(() => {
        setSchedules({
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday
        })
    }, [monday, tuesday, wednesday, thursday, friday, saturday])

    if (faculty === null || facId === null || genId === null || generation === null || department === null || departId === null || classes === null || classId === null || generationByDepart === null || departByFaculty === null || classByGen === null || classInfo === null || subjects === null || userSubject === null || schedules === null || shift === null) {
        return <LoopCircleLoading color="#000000" />
    }

    console.log("selected day: ", userSubject)

    const buttonTem = () => {
        return <Row justify="end">
            <Button className="btn-border-danger mr-10" size="large" onClick={() => history.goBack()}>
                <IntlMessage id="discard" />
            </Button>
            <Button className="btn-border-primary" size="large" htmlType="submit">
                <IntlMessage id="submit" />
            </Button>
        </Row>
    }

    const preventSubmit = (event) => {
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    }

    const onSubmit = val => {
        
        val.schedule = schedules
        let semesDate = val.semesterDate
        let finalDate = val.finalExamDate
        val.semesterDate = {
            startDate: semesDate[0],
            endDate: semesDate[1]
        }
        val.finalExamDate = {
            startDate: finalDate[0],
            endDate: finalDate[1]
        }
        console.log("Val: ", val)

        baseAPI.post('/schedules', val)
            .then(res => {
                console.log("Done: ", res)
                history.goBack()
            })
            .catch(err => console.log(err))

        // console.log("Result: ", val)
    }

    const facultyOption = () => {
        return faculty.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.facultyName}
            </Option>
        })
    }

    const departmentOption = () => {
        if (departByFaculty.length > 0) {
            return departByFaculty.map(res => {
                return <Option key={res._id} value={res._id}>
                    {res.departmentName}
                </Option>
            })
        } else {
            return <Option key="default" value="default">
                Default
            </Option>
        }
    }

    const generationOption = () => {
        if (generationByDepart.length > 0) {
            return generationByDepart.map(res => {
                return <Option key={res._id} value={res._id}>
                    {res.generationName}
                </Option>
            })
        } else {
            return <Option key="default" value="default">
                Default
            </Option>
        }
    }

    const classOption = () => {
        if (classByGen.length > 0) {
            return classByGen.map(res => {
                return <Option key={res._id} value={res._id}>
                    {res.classesName}
                </Option>
            })
        } else {
            return <Option key="default" value="default">
                Default
            </Option>
        }
    }

    const onEnglishClassChange = val => {
        if (val === "monday") {
            let monday = {
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            }
            setMonday(monday)
        } else if (val === "tuesday") {
            let tuesday = {
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            }
            setTuesday(tuesday)
        } else if (val === "wednesday") {
            let wednesday = {
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            }
            setWednesday(wednesday)
        } else if (val === "thursday") {
            let thursday = {
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            }
            setThursday(thursday)
        } else if (val === "friday") {
            let friday = {
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            }
            setFriday(friday)
        } else if (val === "saturday") {
            let saturday = {
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            }
            setSaturday(saturday)
        }
    }

    const onEnglishClassTimeChange = (val, day, index) => {
        if (day === "monday") {
            let monday = {
                startTime: val === null ? null : val[0],
                endTime: val === null ? null : val[1],
                subject: subjects.find(),
                subjectName: "English",
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            }
            setMonday(monday)
        } else if (day === "tuesday") {
            const item = tuesday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setTuesday(clone)
        } else if (day === "wednesday") {
            const item = wednesday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setWednesday(clone)
        } else if (day === "thursday") {
            const item = thursday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setThursday(clone)
        } else if (day === "friday") {
            const item = friday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setFriday(clone)
        } else if (day === "saturday") {
            const item = saturday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setSaturday(clone)
        }
    }

    const infoPart = () => {
        return <div>
            <Row className="mt-30" justify="space-between">
                <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="semester" />}
                        name="semester"
                    >
                        <Select placeholder="Select Semester">
                            <Option value={1} key={1}>1</Option>
                            <Option value={2} key={2}>2</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="semester_start" />}
                        name="semesterDate"
                    >
                        <RangePicker className="w-100" />
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="final_exam" />}
                        name="finalExamDate"
                    >
                        <RangePicker className="w-100" />
                    </Form.Item>
                </Col>
            </Row>

            <Row className="mt-30" justify="space-between">
                <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="faculty" />}
                        name="facultyId"
                        initialValue={facId}
                    >
                        <Select placeholder="Select Faculty" value={facId} onChange={val => setFacId(val)}>
                            { facultyOption() }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="department" />}
                        name="departmentId"
                        initialValue={departId}
                    >
                        <Select placeholder="Select Department" value={departId} onChange={val => setDepartId(val)}>
                            { departmentOption() }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="generation" />}
                        name="generationId"
                        initialValue={genId}
                    >
                        <Select placeholder="Select Generation" onChange={val => setGenId(val)}>
                            { generationOption() }
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row className="mt-30" justify="space-between">
                <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="class" />}
                        name="classId"
                        initialValue={classId}
                    >
                        <Select placeholder="Select Class" onChange={val => setClassId(val)}>
                            { classOption() }
                        </Select>
                    </Form.Item>
                </Col>
                {/* <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="english_class_date" />}
                        name="englishClass"
                    >
                        <Select placeholder="Select English Class" onChange={val => onEnglishClassChange(val)}>
                            <Option value="monday" key="monday"><IntlMessage id="monday" /></Option>
                            <Option value="tuesday" key="tuesday"><IntlMessage id="tuesday" /></Option>
                            <Option value="wednesday" key="wednesday"><IntlMessage id="wednesday" /></Option>
                            <Option value="thursday" key="thursday"><IntlMessage id="thursday" /></Option>
                            <Option value="friday" key="friday"><IntlMessage id="friday" /></Option>
                            <Option value="saturday" key="saturday"><IntlMessage id="saturday" /></Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Row className="fs-15 c-primary pb-8">
                        <span><IntlMessage id="english_class_time" /></span>
                    </Row>
                    <Row>
                        <RangePicker className="w-100" />
                    </Row>
                </Col> */}
            </Row>
        </div>
    }

    const schedulePart = () => {
        return <Row className="mb-20">
            <Col span={4} align="middle">
                <Button className={day === "monday" ? "border-primary" : ""} onClick={() => onSelectedDayChange("monday")}><IntlMessage id="monday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button className={day === "tuesday" ? "border-primary" : ""} onClick={() => onSelectedDayChange("tuesday")}><IntlMessage id="tuesday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button className={day === "wednesday" ? "border-primary" : ""} onClick={() => onSelectedDayChange("wednesday")}><IntlMessage id="wednesday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button className={day === "thursday" ? "border-primary" : ""} onClick={() => onSelectedDayChange("thursday")}><IntlMessage id="thursday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button className={day === "friday" ? "border-primary" : ""} onClick={() => onSelectedDayChange("friday")}><IntlMessage id="friday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button className={day === "saturday" ? "border-primary" : ""} onClick={() => onSelectedDayChange("saturday")}><IntlMessage id="saturday" /></Button>
            </Col>
        </Row>
    }

    const onSelectedDayChange = val => {
        let arr = []
        if (val === "monday") {
            userSubject.map(res => {
                if (res.freeTime.monday.length > 0) {
                    if (res.freeTime.monday[0].startTime !== null) {
                        arr.push(res)
                    }
                }
            })
            setDay("monday")
        } else if (val === "tuesday") {
            userSubject.map(res => {
                if (res.freeTime.tuesday.length > 0) {
                    if (res.freeTime.tuesday[0].startTime !== null) {
                        arr.push(res)
                    }
                }
            })
            setDay("tuesday")
        } else if (val === "wednesday") {
            userSubject.map(res => {
                if (res.freeTime.wednesday.length > 0) {
                    if (res.freeTime.wednesday[0].startTime !== null) {
                        arr.push(res)
                    }
                }
            })
            setDay("wednesday")
        } else if (val === "thursday") {
            userSubject.map(res => {
                if (res.freeTime.thursday.length > 0) {
                    if (res.freeTime.thursday[0].startTime !== null) {
                        arr.push(res)
                    }
                }
            })
            setDay("thursday")
        } else if (val === "friday") {
            userSubject.map(res => {
                if (res.freeTime.friday.length > 0) {
                    if (res.freeTime.friday[0].startTime !== null) {
                        arr.push(res)
                    }
                }
            })
            setDay("friday")
        } else if (val === "saturday") {
            userSubject.map(res => {
                if (res.freeTime.saturday.length > 0) {
                    if (res.freeTime.saturday[0].startTime !== null) {
                        arr.push(res)
                    }
                }
            })
            setDay("saturday")
        } 
        console.log("OBJ: ", arr)
        setSelectedDay(arr)
        setIsOpen(true)
    }

    const onOk = () => {
        setIsOpen(false)
    }

    const onCancel = () => {
        setIsOpen(false)
    }

    const onLecturerChange = (val, day, index) => {
        if (day === "monday") {
            const item = monday
            item[index].teacher = val
            item[index].teacherName = userSubject.find(x => x.lecId === val).lecName
            item[index].subject = userSubject.find(x => x.lecId === val).subjectId
            item[index].subjectName = userSubject.find(x => x.lecId === val).subjectName
            let clone = [...item]
            clone[index] = item[index]
            setMonday(clone)
        } else if (day === "tuesday") {
            const item = tuesday
            item[index].teacher = val
            item[index].teacherName = userSubject.find(x => x.lecId === val).lecName
            item[index].subject = userSubject.find(x => x.lecId === val).subjectId
            item[index].subjectName = userSubject.find(x => x.lecId === val).subjectName
            let clone = [...item]
            clone[index] = item[index]
            setTuesday(clone)
        } else if (day === "wednesday") {
            const item = wednesday
            item[index].teacher = val
            item[index].teacherName = userSubject.find(x => x.lecId === val).lecName
            item[index].subject = userSubject.find(x => x.lecId === val).subjectId
            item[index].subjectName = userSubject.find(x => x.lecId === val).subjectName
            let clone = [...item]
            clone[index] = item[index]
            setWednesday(clone)
        } else if (day === "thursday") {
            const item = thursday
            item[index].teacher = val
            item[index].teacherName = userSubject.find(x => x.lecId === val).lecName
            item[index].subject = userSubject.find(x => x.lecId === val).subjectId
            item[index].subjectName = userSubject.find(x => x.lecId === val).subjectName
            let clone = [...item]
            clone[index] = item[index]
            setThursday(clone)
        } else if (day === "friday") {
            const item = friday
            item[index].teacher = val
            item[index].teacherName = userSubject.find(x => x.lecId === val).lecName
            item[index].subject = userSubject.find(x => x.lecId === val).subjectId
            item[index].subjectName = userSubject.find(x => x.lecId === val).subjectName
            let clone = [...item]
            clone[index] = item[index]
            setFriday(clone)
        } else if (day === "saturday") {
            const item = saturday
            item[index].teacher = val
            item[index].teacherName = userSubject.find(x => x.lecId === val).lecName
            item[index].subject = userSubject.find(x => x.lecId === val).subjectId
            item[index].subjectName = userSubject.find(x => x.lecId === val).subjectName
            let clone = [...item]
            clone[index] = item[index]
            setSaturday(clone)
        }
    }

    const onRoomChange = (val, day, index) => {
        if (day === "monday") {
            const item = monday
            item[index].room = val
            let clone = [...item]
            clone[index] = item[index]
            setMonday(clone)
        } else if (day === "tuesday") {
            const item = tuesday
            item[index].room = val
            let clone = [...item]
            clone[index] = item[index]
            setTuesday(clone)
        } else if (day === "wednesday") {
            const item = wednesday
            item[index].room = val
            let clone = [...item]
            clone[index] = item[index]
            setWednesday(clone)
        } else if (day === "thursday") {
            const item = thursday
            item[index].room = val
            let clone = [...item]
            clone[index] = item[index]
            setThursday(clone)
        } else if (day === "friday") {
            const item = friday
            item[index].room = val
            let clone = [...item]
            clone[index] = item[index]
            setFriday(clone)
        } else if (day === "saturday") {
            const item = saturday
            item[index].room = val
            let clone = [...item]
            clone[index] = item[index]
            setSaturday(clone)
        }
    }

    console.log("C Time: ", selectedTimeRange.monday)

    const onChangeTime = (val, index, day) => {
        console.log("Val: ", val)
        if (day === "monday") {
            const item = monday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setMonday(clone)
            console.log("JJJJ: ", val[1])
            let start = moment(val[0])._d.getHours()
            let end = moment(val[1])._d.getHours()
            let sub = end - start
            let cTime = selectedTimeRange
            for (let i=0; i<sub; i++) {
                if (end-1 > start) {
                    cTime.monday.push(end-1)
                } else if (end-1 === start) {
                    cTime.monday.push(start)
                }
                end -= 1
            }
            setSelectedTimeRange(cTime)
        } else if (day === "tuesday") {
            const item = tuesday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setTuesday(clone)
        } else if (day === "wednesday") {
            const item = wednesday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setWednesday(clone)
        } else if (day === "thursday") {
            const item = thursday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setThursday(clone)
        } else if (day === "friday") {
            const item = friday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setFriday(clone)
        } else if (day === "saturday") {
            const item = saturday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setSaturday(clone)
        }
    }

    const onClassTypeChange = (val, day, index) => {
        if (day === "monday") {
            const item = monday
            item[index].type = val
            item[index].duration = val === "Lecture" ? userSubject.find(x => x.lecId === item[index].teacher).duration : userSubject.find(x => x.lecId === item[index].teacher).labDuration
            let clone = [...item]
            clone[index] = item[index]
            setMonday(clone)
        } else if (day === "tuesday") {
            const item = tuesday
            item[index].type = val
            item[index].duration = val === "Lecture" ? userSubject.find(x => x.lecId === item[index].teacher).duration : userSubject.find(x => x.lecId === item[index].teacher).labDuration
            let clone = [...item]
            clone[index] = item[index]
            setTuesday(clone)
        } else if (day === "wednesday") {
            const item = wednesday
            item[index].type = val
            item[index].duration = val === "Lecture" ? userSubject.find(x => x.lecId === item[index].teacher).duration : userSubject.find(x => x.lecId === item[index].teacher).labDuration
            let clone = [...item]
            clone[index] = item[index]
            setWednesday(clone)
        } else if (day === "thursday") {
            const item = thursday
            item[index].type = val
            item[index].duration = val === "Lecture" ? userSubject.find(x => x.lecId === item[index].teacher).duration : userSubject.find(x => x.lecId === item[index].teacher).labDuration
            let clone = [...item]
            clone[index] = item[index]
            setThursday(clone)
        } else if (day === "friday") {
            const item = friday
            item[index].type = val
            item[index].duration = val === "Lecture" ? userSubject.find(x => x.lecId === item[index].teacher).duration : userSubject.find(x => x.lecId === item[index].teacher).labDuration
            let clone = [...item]
            clone[index] = item[index]
            setFriday(clone)
        } else if (day === "saturday") {
            const item = saturday
            item[index].type = val
            item[index].duration = val === "Lecture" ? userSubject.find(x => x.lecId === item[index].teacher).duration : userSubject.find(x => x.lecId === item[index].teacher).labDuration
            let clone = [...item]
            clone[index] = item[index]
            setSaturday(clone)
        }
    }

    const classTypeOption = (day, index) => {
        if (day === "monday") {
            let obj = userSubject.find(x => x.lecId === monday[index].teacher)
            console.log("OBJ: ", monday[index].type)
            if (obj !== undefined) {
                if (obj.hasLab) {
                    return <Select value={monday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                        <Option key="lab" value="Lab">Lab</Option>
                    </Select>
                } else {
                    return <Select value={monday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                    </Select>
                }
            } else {
                return <Select placeholder="Select Class Type" className="w-100" />
            }
        } else if (day === "tuesday") {
            let obj = userSubject.find(x => x.lecId === tuesday[index].teacher)
            console.log("OBJ: ", tuesday[index].type)
            if (obj !== undefined) {
                if (obj.hasLab) {
                    return <Select value={tuesday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                        <Option key="lab" value="Lab">Lab</Option>
                    </Select>
                } else {
                    return <Select value={tuesday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                    </Select>
                }
            } else {
                return <Select placeholder="Select Class Type" className="w-100" />
            }
        } else if (day === "wednesday") {
            let obj = userSubject.find(x => x.lecId === wednesday[index].teacher)
            console.log("OBJ: ", wednesday[index].type)
            if (obj !== undefined) {
                if (obj.hasLab) {
                    return <Select value={wednesday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                        <Option key="lab" value="Lab">Lab</Option>
                    </Select>
                } else {
                    return <Select value={wednesday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                    </Select>
                }
            } else {
                return <Select placeholder="Select Class Type" className="w-100" />
            }
        } else if (day === "thursday") {
            let obj = userSubject.find(x => x.lecId === thursday[index].teacher)
            console.log("OBJ: ", thursday[index].type)
            if (obj !== undefined) {
                if (obj.hasLab) {
                    return <Select value={thursday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                        <Option key="lab" value="Lab">Lab</Option>
                    </Select>
                } else {
                    return <Select value={thursday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                    </Select>
                }
            } else {
                return <Select placeholder="Select Class Type" className="w-100" />
            }
        } else if (day === "friday") {
            let obj = userSubject.find(x => x.lecId === friday[index].teacher)
            console.log("OBJ: ", friday[index].type)
            if (obj !== undefined) {
                if (obj.hasLab) {
                    return <Select value={friday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                        <Option key="lab" value="Lab">Lab</Option>
                    </Select>
                } else {
                    return <Select value={friday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                    </Select>
                }
            } else {
                return <Select placeholder="Select Class Type" className="w-100" />
            }
        } else if (day === "saturday") {
            let obj = userSubject.find(x => x.lecId === saturday[index].teacher)
            console.log("OBJ: ", saturday[index].type)
            if (obj !== undefined) {
                if (obj.hasLab) {
                    return <Select value={saturday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                        <Option key="lab" value="Lab">Lab</Option>
                    </Select>
                } else {
                    return <Select value={saturday[index].type} placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                        <Option key="lec" value="Lecture">Lecture</Option>
                    </Select>
                }
            } else {
                return <Select placeholder="Select Class Type" className="w-100" />
            }
        }
    }

    const inputSchedule = (val, time) => {
        return val.map((res, index) => {
            if (index === 0) {
                return <div className="mt-20">
                    <Row>
                        <Col span={2} />
                        <Col span={4} className="mr-20">
                            <span><IntlMessage id="lecturer" /></span>
                        </Col>
                        <Col span={4} className="mr-20">
                            <span><IntlMessage id="class_type" /></span>
                        </Col>
                        <Col span={4} className="mr-20">
                            <span><IntlMessage id="room" /></span>
                        </Col>
                        <Col span={7}>
                            <span><IntlMessage id="start_time" /></span>
                        </Col>
                    </Row>
                    <Row className="mt-10" align="middle">
                        <Col span={2} />
                        <Col span={4} className="mr-20">
                            <Select placeholder="Select Lecturer" value={res.teacher} onChange={val => onLecturerChange(val, day, index)} className="w-100">
                                { selectedDay.map(day => {
                                    return <Option id={day.lecId} value={day.lecId}>{day.lecName}</Option>
                                }) }
                            </Select>
                        </Col>
                        <Col span={4} className="mr-20">
                            { classTypeOption(day, index) }
                        </Col>
                        <Col span={4} className="mr-20">
                            <Input placeholder="Enter Room" onChange={val => onRoomChange(val.target.value, day, index)} />
                        </Col>
                        <Col span={7}>
                            <TimePicker.RangePicker 
                                value={[res.startTime, res.endTime]} 
                                onChange={val => onChangeTime(val, index, day)} 
                                className="w-100" 
                                disabledHours={() => time}
                            />
                        </Col>
                    </Row>
                </div>
            } else {
                return <div className="mt-10">
                    <Row align="middle">
                        <Col span={2} />
                        <Col span={4} className="mr-20">
                            <Select placeholder="Select Lecturer" value={res.teacher} onChange={val => onLecturerChange(val, day, index)} className="w-100">
                                { selectedDay.map(day => {
                                    return <Option id={day.lecId} value={day.lecId}>{day.lecName}</Option>
                                }) }
                            </Select>
                        </Col>
                        <Col span={4} className="mr-20">
                            { classTypeOption(day, index) }
                        </Col>
                        <Col span={4} className="mr-20">
                            <Input placeholder="Enter Room"
                            value={res.room} onChange={val => onRoomChange(val.target.value, day, index)} />
                        </Col>
                        <Col span={7} className="mr-20">
                            <TimePicker.RangePicker 
                                value={[res.startTime, res.endTime]} 
                                onChange={val => onChangeTime(val, index, day)} 
                                className="w-100" 
                                disabledHours={() => time}
                            />
                        </Col>
                        <Col span={1}>
                            <MinusCircleOutlined onClick={() => onRemoveTime(index, day)} />
                        </Col>
                    </Row>
                </div>
            }
        })
    }

    const onAddSchedule = day => {
        if (day === "monday") {
            monday.push({
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            })
            let clone = [...monday]
            setMonday(clone)
        } else if (day === "tuesday") {
            tuesday.push({
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            })
            let clone = [...tuesday]
            setTuesday(clone)
        } else if (day === "wednesday") {
            wednesday.push({
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            })
            let clone = [...wednesday]
            setWednesday(clone)
        } else if (day === "thursday") {
            thursday.push({
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            })
            let clone = [...thursday]
            setThursday(clone)
        } else if (day === "friday") {
            friday.push({
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            })
            let clone = [...friday]
            setFriday(clone)
        } else if (day === "saturday") {
            saturday.push({
                startTime: null,
                endTime: null,
                subject: null,
                subjectName: null,
                type: null,
                teacher: null,
                teacherName: null,
                duration: null,
                room: null
            })
            let clone = [...saturday]
            setSaturday(clone)
        }
    }

    const onRemoveTime = (index, day) => {
        if (day === "monday") {
            monday.splice(index, 1)
            let clone = [...monday]
            setMonday(clone)
        } else if (day === "tuesday") {
            tuesday.splice(index, 1)
            let clone = [...tuesday]
            setTuesday(clone)
        } else if (day === "wednesday") {
            wednesday.splice(index, 1)
            let clone = [...wednesday]
            setWednesday(clone)
        } else if (day === "thursday") {
            thursday.splice(index, 1)
            let clone = [...thursday]
            setThursday(clone)
        } else if (day === "friday") {
            friday.splice(index, 1)
            let clone = [...friday]
            setFriday(clone)
        } else if (day === "saturday") {
            saturday.splice(index, 1)
            let clone = [...saturday]
            setSaturday(clone)
        }
    }

    const displayLecTime = val => {
        if (selectedDay !== null) {
            if (val === "monday") {
                return <div>
                    <span className="ml-90 fw-bold">Monday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col span={1} />
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={7}>
                                <span>{res.lecName} ({res.subjectName} {res.duration}mn)</span>
                            </Col>
                            <Col span={14}>
                                { res.freeTime.monday.map(result => {
                                    if (result.status === false) {
                                        return <span className="ml-10">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    } else {
                                        return <span className="ml-10 c-red">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    }
                                }) }
                            </Col>
                        </Row>
                    }) }
                    { inputSchedule(monday, selectedTimeRange.monday) }
                    <Row className="mt-10 mb-20">
                        <Col span={2} />
                        <Col>
                            <Button onClick={() => onAddSchedule(day)}><PlusCircleOutlined className="mr-5" /><IntlMessage id="monday" /></Button>
                        </Col>
                    </Row>
                </div>
            } else if (val === "tuesday") {
                return <div>
                    <span className="ml-90 fw-bold">Tuesday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col span={1} />
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={7}>
                                <span>{res.lecName} ({res.subjectName} {res.duration}mn)</span>
                            </Col>
                            <Col span={14}>
                                { res.freeTime.tuesday.map(result => {
                                    if (result.status === false) {
                                        return <span className="ml-10">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    } else {
                                        return <span className="ml-10 c-red">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    }
                                }) }
                            </Col>
                        </Row>
                    }) }
                    { inputSchedule(tuesday) }
                    <Row className="mt-10 mb-20">
                        <Col span={2} />
                        <Col>
                            <Button onClick={() => onAddSchedule(day)}><PlusCircleOutlined className="mr-5" /><IntlMessage id="tuesday" /></Button>
                        </Col>
                    </Row>
                </div>
            } else if (val === "wednesday") {
                return <div>
                    <span className="ml-90 fw-bold">Wednesday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col span={1} />
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={7}>
                                <span>{res.lecName} ({res.subjectName} {res.duration}mn)</span>
                            </Col>
                            <Col span={14}>
                                { res.freeTime.wednesday.map(result => {
                                    if (result.status === false) {
                                        return <span className="ml-10">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    } else {
                                        return <span className="ml-10 c-red">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    }
                                }) }
                            </Col>
                        </Row>
                    }) }
                    { inputSchedule(wednesday) }
                    <Row className="mt-10 mb-20">
                        <Col span={2} />
                        <Col>
                            <Button onClick={() => onAddSchedule(day)}><PlusCircleOutlined className="mr-5" /><IntlMessage id="wednesday" /></Button>
                        </Col>
                    </Row>
                </div>
            } else if (val === "thursday") {
                return <div>
                    <span className="ml-90 fw-bold">Thursday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col span={1} />
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={7}>
                                <span>{res.lecName} ({res.subjectName} {res.duration}mn)</span>
                            </Col>
                            <Col span={14}>
                                { res.freeTime.thursday.map(result => {
                                    if (result.status === false) {
                                        return <span className="ml-10">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    } else {
                                        return <span className="ml-10 c-red">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    }
                                }) }
                            </Col>
                        </Row>
                    }) }
                    { inputSchedule(thursday) }
                    <Row className="mt-10 mb-20">
                        <Col span={2} />
                        <Col>
                            <Button onClick={() => onAddSchedule(day)}><PlusCircleOutlined className="mr-5" /><IntlMessage id="thursday" /></Button>
                        </Col>
                    </Row>
                </div>
            } else if (val === "friday") {
                return <div>
                    <span className="ml-90 fw-bold">Friday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col span={1} />
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={7}>
                                <span>{res.lecName} ({res.subjectName} {res.duration}mn)</span>
                            </Col>
                            <Col span={14}>
                                { res.freeTime.friday.map(result => {
                                    if (result.status === false) {
                                        return <span className="ml-10">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    } else {
                                        return <span className="ml-10 c-red">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    }
                                }) }
                            </Col>
                        </Row>
                    }) }
                    { inputSchedule(friday) }
                    <Row className="mt-10 mb-20">
                        <Col span={2} />
                        <Col>
                            <Button onClick={() => onAddSchedule(day)}><PlusCircleOutlined className="mr-5" /><IntlMessage id="friday" /></Button>
                        </Col>
                    </Row>
                </div>
            } else if (val === "saturday") {
                return <div>
                    <span className="ml-90 fw-bold">Saturday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col span={1} />
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={7}>
                                <span>{res.lecName} ({res.subjectName} {res.duration}mn)</span>
                            </Col>
                            <Col span={14}>
                                { res.freeTime.saturday.map(result => {
                                    if (result.status === false) {
                                        return <span className="ml-10">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    } else {
                                        return <span className="ml-10 c-red">{moment(result.startTime).format('HH:mm')} - {moment(result.endTime).format('HH:mm')} </span>
                                    }
                                }) }
                            </Col>
                        </Row>
                    }) }
                    { inputSchedule(saturday) }
                    <Row className="mt-10 mb-20">
                        <Col span={2} />
                        <Col>
                            <Button onClick={() => onAddSchedule(day)}><PlusCircleOutlined className="mr-5" /><IntlMessage id="saturday" /></Button>
                        </Col>
                    </Row>
                </div>
            }
        }
    }

    return (
        <Fragment>
            <IntlMessage id="schedule">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <Form
                className="mt-30"
                name="basic"
                layout="vertical"
                onFinish={onSubmit}
                onKeyDown={event => preventSubmit(event)}
                onKeyPress={event => preventSubmit(event)}
                onKeyUp={event => preventSubmit(event)}
                // initialValues={{
                //     "monday": curUser.freeTime.monday,
                // }}
            >
                <HeaderPage id="create_schedule" button={buttonTem()} />

                <Form.Item className="form-item-header mt-50">
                    <Row justify="space-between" align="middle">
                        <span><IntlMessage id="info" /></span>  
                        { infoOpen === true ? <BiDownArrow className="cursor-pointer" onClick={() => setInfoOpen(false)} /> : <BiRightArrow className="cursor-pointer" onClick={() => setInfoOpen(true)} /> }                  
                    </Row>
                    <hr />
                </Form.Item>
                { infoOpen === true ? infoPart() : <></> }

                <Form.Item className="form-item-header mt-50">
                    <Row justify="space-between" align="middle">
                        <span><IntlMessage id="schedule" /></span>  
                        { scheduleOpen === true ? <BiDownArrow className="cursor-pointer" onClick={() => setScheduleOpen(false)} /> : <BiRightArrow className="cursor-pointer" onClick={() => setScheduleOpen(true)} /> }                  
                    </Row>
                    <hr />
                </Form.Item>
                { scheduleOpen === true ? schedulePart() : <></> }

                { isOpen ? displayLecTime(day) : <></> }

                <ScheduleTableTemplate className="mt-40" schedules={schedules} shift={shift} />

                <Row className="mt-50" />
                {/* <Modal width={1000} title="Set Time" visible={isOpen} onOk={onOk} onCancel={onCancel}> */}
                {/* </Modal> */}

            </Form>
        </Fragment>
    )
}

export default CreateSchedule