import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Row, Col, Button } from 'antd'
import baseAPI from '../api/baseAPI'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'
import moment from 'moment'
import IntlMessages from '../helpers/IntlMessages'

const ScheduleTemplate = () => {

    const history = useHistory()
    const location = useLocation()
    const schedules = location.state.schedule
    const [users, setUsers] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const [generations, setGenerations] = useState(null)
    const [classes, setClasses] = useState(null)
    const [shift, setShift] = useState(null)

    // const [curUser, setCurUser] = useState(null)

    console.log("JJJJJJJJJ: ", location.state)

    useEffect(() => {
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

        baseAPI.get('/generations')
            .then(res => {
                setGenerations(res.data)
            })
            .catch(err => console.log(err))

        baseAPI.get('/classes')
            .then(res => {
                setClasses(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (classes !== null) {
            let c = classes.find(x => x._id === location.state.classId)
            setShift(c.shift)
        }
    }, [classes])

    console.log("Schedule: ", schedules)

    if (users === null || subjects === null || generations === null || classes === null || shift === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const displayTime = (day, shift) => {
        if (day.length > 0) {
            let ch = shift === 'morning' ? 7 : 12
            let cm = shift = 0
            let endLoop = shift === 'morning' ? 13 : 18

            return day.map(res => {
                let startH = moment(res.startTime)._d.getHours()
                let startM = moment(res.startTime)._d.getMinutes()
                let endH = moment(res.endTime)._d.getHours()
                let endM = moment(res.endTime)._d.getMinutes()
                let emptyHeight = 0
                console.log("H")

                for (let i=0; i<12; i++) {
                    if (ch < endLoop) {
                        if (startH === ch && startM === cm) {
                            console.log("If")
                            let sumH = endH - startH
                            let sumM = (endM - startM) / 60
                            let sum = sumH + sumM
                            let height = sum * 50
                            let eHeight = emptyHeight * 50
                            ch = endH
                            cm = endM
        
                            return <div>
                                <Row style={{height: `${eHeight}px`}} />
                                <Row style={{height: `${height}px`}} justify="center" align="middle" className="border-top border-bottom w-100">
                                    <Col>
                                        <Row justify="center" className="c-black fs-11">
                                            <span className="mr-5">{subjects.find(x => x._id === res.subject).subjectName}</span>
                                            {calculateDuration(res.duration)}
                                        </Row>
                                        <Row justify="center" className="c-black fs-11"><span>{res.type}</span></Row>
                                        <Row justify="center" className="c-black fs-11"><span>{users.find(x => x._id === res.teacher).username}</span></Row>
                                    </Col>
                                </Row>
                            </div>
                        } else {
                            console.log("Else")
                            emptyHeight += 0.5
                            if (cm === 0) {
                                cm = 30
                            } else {
                                ch += 1
                                cm = 0
                            }
                        }
                    }
                }
            })
        }
    }

    const calculateDuration = val => {
        let hours = parseInt(val / 60)
        let minutes = val % 60
        if (minutes !== 0) {
            return <span>({hours}h{minutes})</span>
        } else {
            return <span>({hours}h)</span>
        }
    }

    const scheduleHeader = () => {
        return <div>
            <Row className="w-100 mt-50 fw-bold c-black fs-18" justify="center" align="middle">
                <span><IntlMessages id="kingdom_of_cambodia" /></span>
            </Row>
            <Row className="w-100 fw-bold c-black" justify="center" align="middle">
                <span><IntlMessages id="nation_religion_king" /></span>
            </Row>

            <Row className="w-100​ mt-20 fw-bold c-black" justify="left" align="middle">
                <IntlMessages id="education_youth_sport" />
            </Row>
            <Row className="w-100 fw-bold c-black" justify="left" align="middle">
                <span>Royal University of Phnom Penh</span>
            </Row>
            <Row className="w-100 fw-bold c-black" justify="left" align="middle">
                {location.state.facultyName}
            </Row>
        </div>
    }

    const scheduleInfo = () => {
        return <div>
            <Row className="w-100 mt-20 fw-bold c-black" justify="center" align="middle">
                <span><IntlMessages id="semester" /> {location.state.semester}</span>
            </Row>
            <Row className="w-100 fw-bold c-black" justify="center" align="middle">
                <span><IntlMessages id="year" /> {generations.find(x => x._id === location.state.generationId).year}: {location.state.departmentName}</span>
            </Row>
            <Row className="w-100 c-black" justify="center" align="middle">
                <span>Semester start from: {moment(location.state.semesterDate.startDate).format("YYYY-MM-DD")} - {moment(location.state.semesterDate.endDate).format("YYYY-MM-DD")}</span>
            </Row>
            <Row className="w-100 c-black" justify="center" align="middle">
                <span>Final Exam start from: {moment(location.state.finalExamDate.startDate).format("YYYY-MM-DD")} - {moment(location.state.finalExamDate.endDate).format("YYYY-MM-DD")}</span>
            </Row>
        </div>
    }

    const subjectCredit = () => {
        let curClass = classes.find(x => x._id === location.state.classId)
        return <Col span={10}>
            { curClass.userSubject.map((res, index) => {
                return <Row>
                    <Col span={1}>
                        <span>{index + 1}</span>
                    </Col>
                    <Col span={19}>
                        <span>{subjects.find(x => x._id === res.subject).subjectName}</span>
                    </Col>
                    <Col span={4}>
                        <span>{subjects.find(x => x._id === res.subject).credit}</span>
                        {subjectCalculateTime(res.subject)}
                    </Col>
                </Row>
            }) }
        </Col>
    }

    const subjectCalculateTime = val => {
        let subject = subjects.find(x => x._id === val)
        let lecDuration = subject.duration / 60
        let labDuration = subject.hasLab ? subject.labDuration / 60 : 0
        return <span>({lecDuration}-{labDuration})</span>
    }

    return (
        <Fragment>
            <Row />
            {/* <Row className="w-100 mt-50 fw-bold c-black fs-18" justify="center" align="middle">
                <span>ព្រះរាជាណាចក្រកម្ពុជា</span>
            </Row>
            <Row className="w-100 fw-bold c-black" justify="center" align="middle">
                <span>ជាតិ សាសនា ព្រះមហាក្សត្រ</span>
            </Row>

            <Row className="w-100​ mt-20 fw-bold c-black" justify="left" align="middle">
                <span>ក្រសួងអប់រំ យុវជន​ និងកីឡា</span>
            </Row>
            <Row className="w-100 fw-bold c-black" justify="left" align="middle">
                <span>សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ</span>
            </Row>
            <Row className="w-100 fw-bold c-black" justify="left" align="middle">
                <span>មហាវិទ្យាល័យវិស្វកម្ម</span>
            </Row> */}

            { scheduleHeader() }

            {/* <Row className="w-100 mt-20 fw-bold c-black" justify="center" align="middle">
                <span>កាលវិភាគឆមាសទី១</span>
            </Row>
            <Row className="w-100 fw-bold c-black" justify="center" align="middle">
                <span>ឆ្នាំទី១៖ ដេប៉ាតឺម៉ង់វិស្វកម្មបច្ចេកវិទ្យាព័ត៌មាន (បង់ថ្លៃ)</span>
            </Row>
            <Row className="w-100 c-black" justify="center" align="middle">
                <span>ចាប់ពីថ្ងៃទី០១ ខែមេសា ឆ្នាំ២០២១ ដល់​ ថ្ងៃទី១៧ ខែកក្កដា ឆ្នាំ២០២១​</span>
            </Row>
            <Row className="w-100 c-black" justify="center" align="middle">
                <span>ប្រលងឆមាសថ្ងៃទី១៩ ដល់​ ថ្ងៃទី២៤ ខែកក្កដា ឆ្នាំ២០២១​</span>
            </Row> */}

            { scheduleInfo() }

            <Row className="w-100​ mt-20 c-black" justify="left" align="middle">
                <Col span={1} className="mr-35" />
                <Col span={3}>
                    <span><IntlMessages id="total_student" />: </span>
                </Col>
                <Col span={2}>
                    <span><IntlMessages id="room" />: </span>
                </Col>
                <Col span={8}>
                    <span><IntlMessages id="class" />: {location.state.classesName}</span>
                </Col>
            </Row>

            <Row className="w-100​ c-black" justify="center">
                <Col span={3} align="middle" className="border-all">
                    <span>Time</span>
                </Col>
                <Col span={3} align="middle" className="border-right border-top border-bottom">
                    <span>Monday</span>
                </Col>
                <Col span={3} align="middle" className="border-right border-top border-bottom">
                    <span>Tuesday</span>
                </Col>
                <Col span={3} align="middle" className="border-right border-top border-bottom">
                    <span>Wednesday</span>
                </Col>
                <Col span={3} align="middle" className="border-right border-top border-bottom">
                    <span>Thursday</span>
                </Col>
                <Col span={3} align="middle" className="border-right border-top border-bottom">
                    <span>Friday</span>
                </Col>
                <Col span={3} align="middle" className="border-right border-top border-bottom">
                    <span>Saturday</span>
                </Col>
            </Row>

            <Row className="w-100​ c-black" justify="center">
                { shift === "M" ? <Col span={3}>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>7:00-8:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>8:00-9:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>9:00-10:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>10:00-11:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>11:00-12:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>12:00-13:00</span>
                    </Row>
                </Col> : <Col span={3}>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>12:00-13:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>13:00-14:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>14:00-15:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>15:00-16:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>16:00-17:00</span>
                    </Row>
                    <Row style={{height: "50px"}} justify="center" align="middle" className="border-all w-100">
                        <span>17:00-18:00</span>
                    </Row>
                </Col> }
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.monday, shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.tuesday, shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.wednesday, shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.thursday, shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.friday, shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.saturday, shift) }
                </Col>
            </Row>

            <Row className="c-black mt-20">
                { subjectCredit() }
                {/* <Col span={8}>
                    <Row>
                        <Col span={1}>
                            <span>1</span>
                        </Col>
                        <Col span={20}>
                            <span>Computer Fundamental (CF)</span>
                        </Col>
                        <Col span={3}>
                            <span>3(1.5-2)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}>
                            <span>2</span>
                        </Col>
                        <Col span={20}>
                            <span>Physics</span>
                        </Col>
                        <Col span={3}>
                            <span>3(3-0)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}>
                            <span>3</span>
                        </Col>
                        <Col span={20}>
                            <span>Math I</span>
                        </Col>
                        <Col span={3}>
                            <span>3(3-0)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}>
                            <span>4</span>
                        </Col>
                        <Col span={20}>
                            <span>Civilization and History</span>
                        </Col>
                        <Col span={3}>
                            <span>3(3-0)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}>
                            <span>5</span>
                        </Col>
                        <Col span={20}>
                            <span>Acadamic Skill</span>
                        </Col>
                        <Col span={3}>
                            <span>2(2-0)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}>
                            <span>6</span>
                        </Col>
                        <Col span={20}>
                            <span>Critical Thinking & Personal Deverlopment (CTPD)</span>
                        </Col>
                        <Col span={3}>
                            <span>2(2-0)</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}>
                            <span>7</span>
                        </Col>
                        <Col span={20}>
                            <span>English</span>
                        </Col>
                        <Col span={3}>
                            <span>4(4-0)</span>
                        </Col>
                    </Row>
                </Col> */}
                <Col span={14}>
                    <Row justify="end" className="w-100">
                        <Col span={8}>
                            <Row justify="center">
                                <span>បានឃើញ និងពិនិត្យត្រឹមត្រូវ</span>
                            </Row>
                            <Row justify="center">
                                <span>ប្រធានការិយាល័យសិក្សា</span>
                            </Row>
                        </Col>
                        <Col span={14}>
                            <Row justify="center">
                                <span>រាជធានីភ្នំពេញ ថ្ងៃទី</span>
                                <span className="ml-50">ខែ</span>
                                <span className="ml-70">ឆ្នាំ២០២១</span>
                            </Row>
                            <Row justify="center">
                                <span>ប្រធានដេប៉ាតឺម៉ង់ថ្នាក់ឆ្នាំមូលដ្ឋាន</span>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Fragment>
    )
}

export default ScheduleTemplate
