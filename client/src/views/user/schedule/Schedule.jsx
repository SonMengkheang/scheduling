import React, { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'
import moment from 'moment'
import baseAPI from '../../../api/baseAPI'

const Schedule = () => {

    const curUser = useSelector(state => state.auth.user)
    const [subject, setSubject] = useState(null)
    const [classes, setClasses] = useState(null)
    console.log("User: ", curUser)
    const [monday, setMonday] = useState(null)
    const [tuesday, setTuesday] = useState(null)
    const [wednesday, setWednesday] = useState(null)
    const [thursday, setThursday] = useState(null)
    const [friday, setFriday] = useState(null)
    const [saturday, setSaturday] = useState(null)

    useEffect(() => {
        if (curUser.freeTime !== null || curUser.freeTime !== undefined) {
            let mon = []
            if (curUser.freeTime.monday.length > 0) {
                curUser.freeTime.monday.map(res => {
                    if (res.status) {
                        mon.push(res)
                    }
                })
            }
            setMonday(mon)

            let tues = []
            if (curUser.freeTime.tuesday.length > 0) {
                curUser.freeTime.tuesday.map(res => {
                    if (res.status) {
                        tues.push(res)
                    }
                })
            }
            setTuesday(tues)

            let wed = []
            if (curUser.freeTime.wednesday.length > 0) {
                curUser.freeTime.wednesday.map(res => {
                    if (res.status) {
                        wed.push(res)
                    }
                })
            }
            setWednesday(wed)

            let thurs = []
            if (curUser.freeTime.thursday.length > 0) {
                curUser.freeTime.thursday.map(res => {
                    if (res.status) {
                        thurs.push(res)
                    }
                })
            }
            setThursday(thurs)

            let fri = []
            if (curUser.freeTime.friday.length > 0) {
                curUser.freeTime.friday.map(res => {
                    if (res.status) {
                        fri.push(res)
                    }
                })
            }
            setFriday(fri)

            let sat = []
            if (curUser.freeTime.saturday.length > 0) {
                curUser.freeTime.saturday.map(res => {
                    if (res.status) {
                        sat.push(res)
                    }
                })
            }
            setSaturday(sat)
        }
    }, [curUser])

    useEffect(() => {
        baseAPI.get('/subjects')
            .then(res => {
                setSubject(res.data)
            })
            .catch(err => console.log(err))

        baseAPI.get('/classes')
            .then(res => {
                setClasses(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    if (curUser.freeTime === undefined || monday === null || tuesday === null || wednesday === null || thursday === null || friday === null || saturday === null || subject === null || classes === null) {
        return <LoopCircleLoading color="#000000" />
    }

    console.log("Monday", monday)
    console.log("Tuesday", tuesday)
    console.log("Wednesday", wednesday)
    console.log("Thursday", thursday)
    console.log("Friday", friday)
    console.log("Saturday", saturday)

    const displayTime = (day) => {
        if (day.length > 0) {
            let ch = 7
            let cm = 0
            let endLoop = 18

            return day.map(res => {
                if (res.startTime !== null) {
                    let startH = moment(res.startTime)._d.getHours()
                    let startM = moment(res.startTime)._d.getMinutes()
                    let endH = moment(res.endTime)._d.getHours()
                    let endM = moment(res.endTime)._d.getMinutes()
                    let emptyHeight = 0
    
                    for (let i=0; i<50; i++) {
                        if (ch < endLoop) {
                            if (startH === ch && startM === cm) {
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
                                            {/* <Row justify="center" className="c-black fs-11"><span>{subject.find(x => x._id === res.subject).subjectName} ({subject.find(x => x._id === res.subject).duration})</span></Row>
                                            <Row justify="center" className="c-black fs-11"><span>{res.type}</span></Row> */}
                                        </Col>
                                    </Row>
                                </div>
                            } else {
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
                }
            })
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

            <Row className="mb-50" />

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
                <Col span={3}>
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
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(monday) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(tuesday) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(wednesday) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(thursday) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(friday) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(saturday) }
                </Col>
            </Row>

        </Fragment>
    )
}

export default Schedule