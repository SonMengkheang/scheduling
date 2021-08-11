import React from 'react'
import { Row, Col } from 'antd'

const LecturerTableTemplate = props => {

    const schedules = props.schedules


    const displayTime = (day, shift) => {
        if (day.length > 0) {
            let ch = shift === 'M' ? 7 : 12
            let cm = shift = 0
            let endLoop = shift === 'M' ? 13 : 18

            return day.map(res => {
                if (res.startTime !== null) {
                    let startH = res.startTime._d.getHours()
                    let startM = res.startTime._d.getMinutes()
                    let endH = res.endTime._d.getHours()
                    let endM = res.endTime._d.getMinutes()
                    let emptyHeight = 0
    
                    for (let i=0; i<12; i++) {
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
                                            <Row justify="center" className="c-black fs-11"><span>{res.subjectName} ({res.duration})</span></Row>
                                            <Row justify="center" className="c-black fs-11"><span>{res.type}</span></Row>
                                            <Row justify="center" className="c-black fs-11"><span>{res.teacherName}</span></Row>
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
        <div className={props.className}>
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
                { props.shift === "M" ? <Col span={3}>
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
                    { displayTime(schedules.monday, props.shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.tuesday, props.shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.wednesday, props.shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.thursday, props.shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.friday, props.shift) }
                </Col>
                <Col span={3} className="border-right border-bottom">
                    { displayTime(schedules.saturday, props.shift) }
                </Col>
            </Row>
        </div>
    )
}

export default LecturerTableTemplate
