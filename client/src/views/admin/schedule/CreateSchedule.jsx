import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Row, Col, Button, DatePicker, Select, Modal, TimePicker } from 'antd'
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
                <IntlMessage id="generate" />
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
                            name="semesterStartDate"
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
                            name="faculty"
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
                            name="department"
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
                            name="generation"
                            initialValue={genId}
                        >
                            <Select placeholder="Select Generation">
                                { generationOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mt-30" justify="space-between">
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="class" />}
                            name="classes"
                            initialValue={classId}
                        >
                            <Select placeholder="Select Class">
                                { classOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="english_class" />}
                            name="englishClass"
                        >
                            <Select placeholder="Select English Class">
                                <Option value="monday" key="monday"><IntlMessage id="monday" /></Option>
                                <Option value="tuesday" key="tuesday"><IntlMessage id="tuesday" /></Option>
                                <Option value="wednesday" key="wednesday"><IntlMessage id="wednesday" /></Option>
                                <Option value="thursday" key="thursday"><IntlMessage id="thursday" /></Option>
                                <Option value="friday" key="friday"><IntlMessage id="friday" /></Option>
                                <Option value="saturday" key="saturday"><IntlMessage id="saturday" /></Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7} />
                </Row>
        </div>
    }

    const schedulePart = () => {
        return <Row className="mb-20">
            <Col span={4} align="middle">
                <Button onClick={() => onSelectedDayChange("monday")}><IntlMessage id="monday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button onClick={() => onSelectedDayChange("tuesday")}><IntlMessage id="tuesday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button onClick={() => onSelectedDayChange("wednesday")}><IntlMessage id="wednesday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button onClick={() => onSelectedDayChange("thursday")}><IntlMessage id="thursday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button onClick={() => onSelectedDayChange("friday")}><IntlMessage id="friday" /></Button>
            </Col>
            <Col span={4} align="middle">
                <Button onClick={() => onSelectedDayChange("saturday")}><IntlMessage id="saturday" /></Button>
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

    const onChangeTime = (val, index, day) => {
        console.log("Val: ", val)
        if (day === "monday") {
            const item = monday
            item[index].startTime = val === null ? null : val[0]
            item[index].endTime = val === null ? null : val[1]
            let clone = [...item]
            clone[index] = item[index]
            setMonday(clone)
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

    }

    const classTypeOption = (day, index) => {
        if (day === "monday") {
            let obj = userSubject.find(x => x.lecId === monday[index].teacher)
            console.log("OBJ: ", obj)
            if (obj !== undefined) {
                obj.hasLab === true ? <Select placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                    <Option key="lec" value="Lecture">Lecture</Option>
                    <Option key="lab" value="Lab">Lab</Option>
                </Select> : <Select placeholder="Select Class Type" onChange={val => onClassTypeChange(val, day, index)} className="w-100">
                    <Option key="lec" value="Lecture">Lecture</Option>
                </Select>
            }
        }
    }

    const inputSchedule = val => {
        return val.map((res, index) => {
            if (index === 0) {
                return <div className="mt-20">
                    <Row>
                        <Col span={4}>
                            <span><IntlMessage id="lecturer" /></span>
                        </Col>
                        <Col span={7}>
                            <span><IntlMessage id="start_time" /></span>
                        </Col>
                    </Row>
                    <Row className="mt-10" align="middle">
                        <Col span={4}>
                            <Select onChange={val => onLecturerChange(val, day, index)} className="w-100">
                                { selectedDay.map(day => {
                                    return <Option id={day.lecId} value={day.lecId}>{day.lecName}</Option>
                                }) }
                            </Select>
                        </Col>
                        <Col span={7}>
                            <TimePicker.RangePicker onChange={val => onChangeTime(val, index, day)} className="w-100" />
                        </Col>
                    </Row>
                </div>
            } else {
                return <div className="mt-20">
                    <Row className="mt-10" align="middle">
                        <Col span={4}>
                            <Select onChange={val => onLecturerChange(val, day, index)} className="w-100">
                                { selectedDay.map(day => {
                                    return <Option id={day.lecId} value={day.lecId}>{day.lecName}</Option>
                                }) }
                            </Select>
                        </Col>
                        <Col span={7}>
                            <TimePicker.RangePicker onChange={val => onChangeTime(val, index, day)} className="w-100" />
                        </Col>
                        <Col span={2}>
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
                    <span>Monday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={7}>
                                <span>{res.lecName} ({res.subjectName} {res.duration}mn)</span>
                            </Col>
                            <Col span={16}>
                                { res.freeTime.monday.map(result => {
                                    return <span className="ml-10">{moment(result.startTime).format('HH:mm:ss')} - {moment(result.endTime).format('HH:mm:ss')} </span>
                                }) }
                            </Col>
                        </Row>
                    }) }
                    { inputSchedule(monday) }
                    <Button onClick={() => onAddSchedule(day)}><PlusCircleOutlined className="mr-5" /><IntlMessage id="monday" /></Button>
                </div>
            } else if (val === "tuesday") {
                return <div>
                    <span>Tuesday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={3}>
                                <span>{res.lecName}</span>
                            </Col>
                            <Col span={16}>
                                { res.freeTime.tuesday.map(result => {
                                    return <span className="ml-10">{moment(result.startTime).format('HH:mm:ss')} - {moment(result.endTime).format('HH:mm:ss')} </span>
                                }) }
                            </Col>
                        </Row>
                    }) }
                </div>
            } else if (val === "wednesday") {
                return <div>
                    <span>Wednesday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={3}>
                                <span>{res.lecName}</span>
                            </Col>
                            <Col span={16}>
                                { res.freeTime.wednesday.map(result => {
                                    return <span className="ml-10">{moment(result.startTime).format('HH:mm:ss')} - {moment(result.endTime).format('HH:mm:ss')} </span>
                                }) }
                            </Col>
                        </Row>
                    }) }
                </div>
            } else if (val === "thursday") {
                return <div>
                    <span>Thursday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={3}>
                                <span>{res.lecName}</span>
                            </Col>
                            <Col span={16}>
                                { res.freeTime.thursday.map(result => {
                                    return <span className="ml-10">{moment(result.startTime).format('HH:mm:ss')} - {moment(result.endTime).format('HH:mm:ss')} </span>
                                }) }
                            </Col>
                        </Row>
                    }) }
                </div>
            } else if (val === "friday") {
                return <div>
                    <span>Friday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={3}>
                                <span>{res.lecName}</span>
                            </Col>
                            <Col span={16}>
                                { res.freeTime.friday.map(result => {
                                    return <span className="ml-10">{moment(result.startTime).format('HH:mm:ss')} - {moment(result.endTime).format('HH:mm:ss')} </span>
                                }) }
                            </Col>
                        </Row>
                    }) }
                </div>
            } else if (val === "saturday") {
                return <div>
                    <span>Saturday available lecturer: </span>
                    { selectedDay.map((res, index) => {
                        return <Row>
                            <Col align="middle" span={1}>
                                <span>{index+1}</span>
                            </Col>
                            <Col span={3}>
                                <span>{res.lecName}</span>
                            </Col>
                            <Col span={16}>
                                { res.freeTime.saturday.map(result => {
                                    return <span className="ml-10">{moment(result.startTime).format('HH:mm:ss')} - {moment(result.endTime).format('HH:mm:ss')} </span>
                                }) }
                            </Col>
                        </Row>
                    }) }
                </div>
            }
        }
    }

    console.log("SSSS: ", schedules)

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

                <ScheduleTableTemplate schedules={schedules} shift={shift} />

                <Modal width={1000} title="Set Time" visible={isOpen} onOk={onOk} onCancel={onCancel}>
                    { displayLecTime(day) }
                </Modal>

            </Form>
        </Fragment>
    )
}

export default CreateSchedule