import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Form, Row, Col, Button, TimePicker } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import moment from 'moment'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'

const TimeEdit = () => {

    const history = useHistory()
    const [curUser, setCurUser] = useState(null)
    const [monday, setMonday] = useState([
        {
            startTime: null,
            endTime: null,
            status: false
        }
    ])
    const [tuesday, setTuesday] = useState([
        {
            startTime: null,
            endTime: null,
            status: false
        }
    ])
    const [wednesday, setWednesday] = useState([
        {
            startTime: null,
            endTime: null,
            status: false
        }
    ])
    const [thursday, setThursday] = useState([
        {
            startTime: null,
            endTime: null,
            status: false
        }
    ])
    const [friday, setFriday] = useState([
        {
            startTime: null,
            endTime: null,
            status: false
        }
    ])
    const [saturday, setSaturday] = useState([
        {
            startTime: null,
            endTime: null,
            status: false
        }
    ])

    console.log("Cur: ", curUser)

    useEffect(() => {
        baseAPI.get('/users/profile')
        .then(res => {
            setCurUser(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (curUser !== null) {
            let m = []
            if (curUser.freeTime.monday.length === 0) {
                m.push({
                    startTime: null,
                    endTime: null,
                    status: false
                })
            } else {
                curUser.freeTime.monday.map(res => {
                    if (res.startTime === null && res.endTime === null) {
                        m.push({
                            startTime: null,
                            endTime: null,
                            status: false
                        })
                    } else {
                        m.push({
                            startTime: moment(res.startTime),
                            endTime: moment(res.endTime),
                            status: res.status
                        })
                    }
                })
            }
            setMonday(m)
            
            let t = []
            if (curUser.freeTime.tuesday.length === 0) {
                t.push({
                    startTime: null,
                    endTime: null,
                    status: false
                })
            } else {
                curUser.freeTime.tuesday.map(res => {
                    if (res.startTime === null && res.endTime === null) {
                        t.push({
                            startTime: null,
                            endTime: null,
                            status: false
                        })
                    } else {
                        t.push({
                            startTime: moment(res.startTime),
                            endTime: moment(res.endTime),
                            status: res.status
                        })
                    }
                })
            }
            setTuesday(t)

            let w = []
            if (curUser.freeTime.wednesday.length === 0) {
                w.push({
                    startTime: null,
                    endTime: null,
                    status: false
                })
            } else {
                curUser.freeTime.wednesday.map(res => {
                    if (res.startTime === null && res.endTime === null) {
                        w.push({
                            startTime: null,
                            endTime: null,
                            status: false
                        })
                    } else {
                        w.push({
                            startTime: moment(res.startTime),
                            endTime: moment(res.endTime),
                            status: res.status
                        })
                    }
                })
            }
            setWednesday(w)

            let th = []
            if (curUser.freeTime.thursday.length === 0) {
                th.push({
                    startTime: null,
                    endTime: null,
                    status: false
                })
            } else {
                curUser.freeTime.thursday.map(res => {
                    if (res.startTime === null && res.endTime === null) {
                        th.push({
                            startTime: null,
                            endTime: null,
                            status: false
                        })
                    } else {
                        th.push({
                            startTime: moment(res.startTime),
                            endTime: moment(res.endTime),
                            status: res.status
                        })
                    }
                })
            }
            setThursday(th)

            let f = []
            if (curUser.freeTime.friday.length === 0) {
                f.push({
                    startTime: null,
                    endTime: null,
                    status: false
                })
            } else {
                curUser.freeTime.friday.map(res => {
                    if (res.startTime === null && res.endTime === null) {
                        f.push({
                            startTime: null,
                            endTime: null,
                            status: false
                        })
                    } else {
                        f.push({
                            startTime: moment(res.startTime),
                            endTime: moment(res.endTime),
                            status: res.status
                        })
                    }
                })
            }
            setFriday(f)

            let s = []
            if (curUser.freeTime.saturday.length === 0) {
                s.push({
                    startTime: null,
                    endTime: null,
                    status: false
                })
            } else {
                curUser.freeTime.saturday.map(res => {
                    if (res.startTime === null && res.endTime === null) {
                        s.push({
                            startTime: null,
                            endTime: null,
                            status: false
                        })
                    } else {
                        s.push({
                            startTime: moment(res.startTime),
                            endTime: moment(res.endTime),
                            status: res.status
                        })
                    }
                })
            }
            setSaturday(s)
        }
    }, [curUser])

    if (curUser === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const buttonTem = () => {
        return <Row justify="end">
            <Button className="btn-border-danger mr-10" size="large" onClick={() => history.goBack()}>
                <IntlMessage id="discard" />
            </Button>
            <Button className="btn-border-primary" size="large" htmlType="submit">
                <IntlMessage id="update" />
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
        val.freeTime = {
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday
        }

        baseAPI.patch(`/users/profile/update`, val)
            .then(response => {
                console.log(response)
                history.goBack()
            })
            .catch(error => {
                console.log(error)
            })
        console.log("Val: ", val)
    }

    // const timeList = (val, init) => {
    //     return <Form.List name={val}>
    //         {(fields, { add, remove }) => (
    //             <div>
    //                 {fields.map((field, index) => (
    //                     <Row key={field.key}>
    //                         {console.log("DFS", init[index].time[1])}
    //                         <Col className="mr-20">
    //                             <Form.Item
    //                                 label={index === 0 ? <IntlMessage id={val} /> : ""}
    //                                 name={[index, 'time']}
    //                             >
    //                                 <TimePicker.RangePicker />
    //                             </Form.Item>
    //                         </Col>
    //                         <Col span={1}>
    //                             <MinusCircleOutlined className={index === 0 ? "mt-40" : "mt-10"} onClick={() => remove(field.name)} />
    //                         </Col>
    //                     </Row>
    //                 ))}

    //                 <Form.Item>
    //                     <Button className="btn-primary" onClick={() => add()}>
    //                         <IntlMessage id={val} />
    //                     </Button>
    //                 </Form.Item>
    //             </div>
    //         )}
    //     </Form.List>
    // }

    // const mondayList = () => {
    //     return monday.map((res, index) => {
    //         return <div className="mt-5">
    //             <Row justify="space-between" align="middle">
    //                 <Col span={21}>
    //                     <Row>
    //                         <Col span={24}>
    //                             <TimePicker value={res.startTime} className="w-100" placeholder="Start Time" onChange={val => onChangeStartTime(val, index, "monday")} />
    //                         </Col>
    //                     </Row>
    //                     <Row>
    //                         <Col span={24}>
    //                             <TimePicker value={res.endTime} className="w-100" placeholder="End Time" />
    //                         </Col>
    //                     </Row>
    //                 </Col>
    //                 <Col span={1}>
    //                     <MinusCircleOutlined onClick={() => onRemoveTime(index, "monday")} />
    //                 </Col>
    //                 <Col span={1} />
    //             </Row>
                
    //         </div>
    //     })
    // }

    // const tuesdayList = () => {
    //     return tuesday.map((res, index) => {
    //         return <div className="mt-5">
    //             <Row justify="space-between" align="middle">
    //                 <Col span={22}>
    //                     <Row>
    //                         <Col span={24}>
    //                             <TimePicker className="w-100" placeholder="Start Time" onChange={val => onChangeStartTime(val, index, "tuesday")} />
    //                         </Col>
    //                     </Row>
    //                     <Row>
    //                         <Col span={24}>
    //                             <TimePicker className="w-100" placeholder="End Time" />
    //                         </Col>
    //                     </Row>
    //                 </Col>
    //                 <Col span={1}>
    //                     <MinusCircleOutlined onClick={() => onRemoveTime(index, "tuesday")} />
    //                 </Col>
    //             </Row>
                
    //         </div>
    //     })
    // }

    const newTimeList = (value, day) => {
        return value.map((res, index) => {
            if (value.length === 1) {
                return <div className="mt-5">
                    <Row justify="space-between" align="middle">
                        <Col span={21}>
                            <Row>
                                <TimePicker.RangePicker className="w-100" value={[res.startTime, res.endTime]} onChange={val => onChangeTime(val, index, day)} />
                            </Row>
                        </Col>
                        {/* <Col span={2}>
                            <MinusCircleOutlined onClick={() => onRemoveTime(index, day)} />
                        </Col> */}
                    </Row> 
                </div>
            } else {
                return <div className="mt-5">
                    <Row justify="space-between" align="middle">
                        <Col span={21}>
                            <Row>
                                <TimePicker.RangePicker className="w-100" value={[res.startTime, res.endTime]} onChange={val => onChangeTime(val, index, day)} />
                            </Row>
                        </Col>
                        <Col span={2}>
                            <MinusCircleOutlined onClick={() => onRemoveTime(index, day)} />
                        </Col>
                    </Row>
                </div>
            }
        })
    }

    const onAddTime = day => {
        if (day === "monday") {
            monday.push({
                startTime: null,
                endTime: null,
                status: false
            })
            let clone = [...monday]
            setMonday(clone)
        } else if (day === "tuesday") {
            tuesday.push({
                startTime: null,
                endTime: null,
                status: false
            })
            let clone = [...tuesday]
            setTuesday(clone)
        } else if (day === "wednesday") {
            wednesday.push({
                startTime: null,
                endTime: null,
                status: false
            })
            let clone = [...wednesday]
            setWednesday(clone)
        } else if (day === "thursday") {
            thursday.push({
                startTime: null,
                endTime: null,
                status: false
            })
            let clone = [...thursday]
            setThursday(clone)
        } else if (day === "friday") {
            friday.push({
                startTime: null,
                endTime: null,
                status: false
            })
            let clone = [...friday]
            setFriday(clone)
        } else if (day === "saturday") {
            saturday.push({
                startTime: null,
                endTime: null,
                status: false
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

    // const onChangeStartTime = (val, index, day) => {
    //     console.log("SSS", val)
    //     console.log("index", index)
    //     console.log("day", day)
    //     if (day === "monday") {
    //         const item = monday
    //         item[index].startTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "tuesday") {
    //         const item = tuesday
    //         item[index].startTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "wednesday") {
    //         const item = wednesday
    //         item[index].startTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "thursday") {
    //         const item = thursday
    //         item[index].startTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "friday") {
    //         const item = friday
    //         item[index].startTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "saturday") {
    //         const item = saturday
    //         item[index].startTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     }
    // }

    // const onChangeEndTime = (val, index, day) => {
    //     if (day === "monday") {
    //         const item = monday
    //         item[index].endTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "tuesday") {
    //         const item = tuesday
    //         item[index].endTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "wednesday") {
    //         const item = wednesday
    //         item[index].endTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "thursday") {
    //         const item = thursday
    //         item[index].endTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "friday") {
    //         const item = friday
    //         item[index].endTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     } else if (day === "saturday") {
    //         const item = saturday
    //         item[index].endTime = val
    //         let clone = [...item]
    //         clone[index] = item[index]
    //         setMonday(clone)
    //     }
    // }

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

    console.log("Monday: ", monday)

    return (
        <Fragment>
            <IntlMessage id="time">
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
            >
                <HeaderPage id="edit" button={buttonTem()} />

                {/* <Row justify="space-between" className="mt-30">
                    <Col className="mb-20" span={8}>
                        { timeList('monday', curUser.freeTime.monday) }
                    </Col>
                    <Col span={8}>
                        { timeList('tuesday') }
                    </Col>
                    <Col span={8}>
                        { timeList('wednesday') }
                    </Col>
                    <Col span={8}>
                        { timeList('thursday') }
                    </Col>
                    <Col span={8}>
                        { timeList('friday') }
                    </Col>
                    <Col span={8}>
                        { timeList('saturday') }
                    </Col>
                </Row> */}
                <Row justify="space-between">
                    <Col span={7}>
                        <Row>
                            <span><IntlMessage id="monday" /></span>
                        </Row>
                        {newTimeList(monday, "monday")}
                        <Row className="mt-5">
                            <Button onClick={() => onAddTime("monday")}><PlusCircleOutlined className="mr-5" /><IntlMessage id="monday" /></Button>
                        </Row>
                    </Col>
                    <Col span={7}>
                        <Row>
                            <span><IntlMessage id="tuesday" /></span>
                        </Row>
                        {newTimeList(tuesday, "tuesday")}
                        <Row className="mt-5">
                            <Button onClick={() => onAddTime("tuesday")}><PlusCircleOutlined className="mr-5" /><IntlMessage id="tuesday" /></Button>
                        </Row>
                    </Col>
                    <Col span={7}>
                        <Row>
                            <span><IntlMessage id="wednesday" /></span>
                        </Row>
                        {newTimeList(wednesday, "wednesday")}
                        <Row className="mt-5">
                            <Button onClick={() => onAddTime("wednesday")}><PlusCircleOutlined className="mr-5" /><IntlMessage id="wednesday" /></Button>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-30" justify="space-between">
                    <Col span={7}>
                        <Row>
                            <span><IntlMessage id="thursday" /></span>
                        </Row>
                        {newTimeList(thursday, "thursday")}
                        <Row className="mt-5">
                            <Button onClick={() => onAddTime("thursday")}><PlusCircleOutlined className="mr-5" /><IntlMessage id="thursday" /></Button>
                        </Row>
                    </Col>
                    <Col span={7}>
                        <Row>
                            <span><IntlMessage id="friday" /></span>
                        </Row>
                        {newTimeList(friday, "friday")}
                        <Row className="mt-5">
                            <Button onClick={() => onAddTime("friday")}><PlusCircleOutlined className="mr-5" /><IntlMessage id="friday" /></Button>
                        </Row>
                    </Col>
                    <Col span={7}>
                        <Row>
                            <span><IntlMessage id="saturday" /></span>
                        </Row>
                        {newTimeList(saturday, "saturday")}
                        <Row className="mt-5">
                            <Button onClick={() => onAddTime("saturday")}><PlusCircleOutlined className="mr-5" /><IntlMessage id="saturday" /></Button>
                        </Row>
                    </Col>
                </Row>
                
            </Form>


        </Fragment>
    )
}

export default TimeEdit