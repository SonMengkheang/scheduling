import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import baseAPI from '../api/baseAPI'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'
import moment from 'moment'

const ScheduleTemplate = () => {

    const schedules = {
        monday: [
            {
                startTime: moment('2021-07-16 7:00:00'),
                endTime: moment('2021-07-16 8:30:00'),
                type: "Lecture",
                subject: "CF",
                teacher: "Mr.A"
            },
            {
                startTime: moment('2021-07-16 8:30:00'),
                endTime: moment('2021-07-16 10:30:00'),
                type: "Lab G1",
                subject: "CF",
                teacher: "Mr.A"
            },
            {
                startTime: moment('2021-07-16 10:30:00'),
                endTime: moment('2021-07-16 12:30:00'),
                type: "Lab G2",
                subject: "CF",
                teacher: "Mr.A"
            },
        ],
        tuesday: [
            {
                startTime: moment('2021-07-16 7:00:00'),
                endTime: moment('2021-07-16 8:30:00'),
                type: "Lecture",
                subject: "CH: Civilization",
                teacher: "Mr.B"
            },
            {
                startTime: moment('2021-07-16 9:00:00'),
                endTime: moment('2021-07-16 12:00:00'),
                type: "Lecture",
                subject: "Physics",
                teacher: "Mr.C"
            },
        ],
        wednesday: [
            {
                startTime: moment('2021-07-16 7:00:00'),
                endTime: moment('2021-07-16 10:00:00'),
                type: "Lecture",
                subject: "Math I",
                teacher: "Mr.D"
            },
            {
                startTime: moment('2021-07-16 10:00:00'),
                endTime: moment('2021-07-16 12:00:00'),
                type: "Lecture",
                subject: "CTPD",
                teacher: "Mr.E"
            },
        ],
        thursday: [
            {
                startTime: moment('2021-07-16 7:00:00'),
                endTime: moment('2021-07-16 8:30:00'),
                type: "Lecture",
                subject: "CH: History",
                teacher: "Mr.F"
            },
            {
                startTime: moment('2021-07-16 9:00:00'),
                endTime: moment('2021-07-16 11:00:00'),
                type: "Lecture",
                subject: "Acadamic Skill",
                teacher: "Mr.G"
            },
        ],
        friday: [],
        saturday: [
            {
                startTime: moment('2021-07-16 7:00:00'),
                endTime: moment('2021-07-16 11:00:00'),
                type: "",
                subject: "English",
                teacher: ""
            },
        ]
    }

    const [curUser, setCurUser] = useState(null)

    useEffect(() => {
        baseAPI.get('/users/60bf86a149d5dc43b8b2281a')
        .then(res => {
            setCurUser(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    if (curUser === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const displayTime = (day, shift) => {
        if (day.length > 0) {
            let ch = shift === 'morning' ? 7 : 12
            let cm = shift = 0
            let arr = [1, 2, 3, 4, 5, 6]
            let endLoop = shift === 'morning' ? 13 : 18

            return day.map(res => {
                let startH = res.startTime._d.getHours()
                let startM = res.startTime._d.getMinutes()
                let endH = res.endTime._d.getHours()
                let endM = res.endTime._d.getMinutes()
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
                                        <Row justify="center" className="c-black"><span>{res.subject}</span></Row>
                                        <Row justify="center" className="c-black"><span>{res.type}</span></Row>
                                        <Row justify="center" className="c-black"><span>{res.teacher}</span></Row>
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

                // return arr.map(result => {
                //     console.log("Res: ", result)
                //     console.log("CH: ", ch)
                //     console.log("CM: ", cm)
                //     if (ch < endLoop) {
                //         if (startH === ch && startM === cm) {
                //             console.log("If")
                //             let sumH = endH - startH
                //             let sumM = (endM - startM) / 60
                //             let sum = sumH + sumM
                //             let height = sum * 50
                //             ch = endH
                //             cm = endM
        
                //             return <Row style={{height: `${height}px`}} justify="center" align="middle" className="border-all w-100">
                //                 <Col>
                //                     <Row justify="center" className="c-black"><span>{res.subject}</span></Row>
                //                     <Row justify="center" className="c-black"><span>{res.type}</span></Row>
                //                     <Row justify="center" className="c-black"><span>{res.teacher}</span></Row>
                //                 </Col>
                //             </Row>
                //         } else {
                //             console.log("Else")
                //             if (cm === 0) {
                //                 cm = 30
                //             } else {
                //                 ch += 1
                //                 cm = 0
                //             }
        
                //             // return <Row style={{height: "25px"}} justify="center" align="middle" className="border-all w-100" />
                //         }
                //     }
                // })
            })
        }
    }

    return (
        <Fragment>
            <Row />
            <Row className="w-100 mt-50 fw-bold c-black fs-18" justify="center" align="middle">
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
            </Row>

            <Row className="w-100 mt-20 fw-bold c-black" justify="center" align="middle">
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
            </Row>

            <Row className="w-100​ mt-20 c-black" justify="left" align="middle">
                <Col span={1} className="mr-35" />
                <Col span={2}>
                    <span>ចំនួននិស្សិត៖ </span>
                </Col>
                <Col span={2}>
                    <span>បន្ទប់រៀន៖ </span>
                </Col>
                <Col span={2}>
                    <span>ក្រុម៖ ITE-M1</span>
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
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.monday, 'morning') }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.tuesday, 'morning') }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.wednesday, 'morning') }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.thursday, 'morning') }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.friday, 'morning') }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.saturday, 'morning') }
                </Col>
            </Row>

            <Row className="c-black mt-20">
                <Col span={8}>
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
                </Col>
                <Col span={16}>
                    <Row justify="end" className="w-100">
                        <Col span={8}>
                            <Row justify="center">
                                <span>បានឃើញ និងពិនិត្យត្រឹមត្រូវ</span>
                            </Row>
                            <Row justify="center">
                                <span>ប្រធានការិយាល័យសិក្សា</span>
                            </Row>
                        </Col>
                        <Col span={10}>
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
