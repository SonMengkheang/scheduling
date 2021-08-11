import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table, Row, Col, Button, TimePicker } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import moment from 'moment'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'

const Time = () => {

    const history = useHistory()
    const [curUser, setCurUser] = useState(null)

    useEffect(() => {
        baseAPI.get('/users/profile')
        .then(res => {
            setCurUser(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    if (curUser === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const buttonTem = () => {
        return <Row justify="end">
            <Button className="btn-border-primary" size="large" onClick={() => { history.push('time/edit') }}>
                <IntlMessage id="edit" />
            </Button>
        </Row>
    }

    // let mondayy = moment(curUser.freeTime.monday[0].startTime)

    // console.log("Val: ", mondayy.getHour())
    
    const renderData = [
        {
            monday: curUser.freeTime.monday,
            tuesday: curUser.freeTime.tuesday,
            wednesday: curUser.freeTime.wednesday,
            thursday: curUser.freeTime.thursday,
            friday: curUser.freeTime.friday,
            saturday: curUser.freeTime.saturday,
        }
    ]

    const columns = [
        {
            title: <IntlMessage id="monday" />,
            dataIndex: "monday",
            key: "monday",
            align: "center",
            render: (_, record) => {
                if (record.monday.length > 0) {
                    return record.monday.map(res => {
                        if (res.startTime === null && res.endTime === null) {
                            return <Row className="mb-10" justify="center">
                                <span>N/A</span>
                            </Row>
                        } else {
                            if (res.status === false) {
                                return <Row className="mb-10" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            } else {
                                return <Row className="mb-10 c-red" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            }
                        }
                    })
                }
            }
        },
        {
            title: <IntlMessage id="tuesday" />,
            dataIndex: "tuesday",
            key: "tuesday",
            align: "center",
            render: (_, record) => {
                if (record.tuesday.length > 0) {
                    return record.tuesday.map(res => {
                        if (res.startTime === null && res.endTime === null) {
                            return <Row className="mb-10" justify="center">
                                <span>N/A</span>
                            </Row>
                        } else {
                            if (res.status === false) {
                                return <Row className="mb-10" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            } else {
                                return <Row className="mb-10 c-red" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            }
                        }
                    })
                }
            }
        },
        {
            title: <IntlMessage id="wednesday" />,
            dataIndex: "wednesday",
            key: "wednesday",
            align: "center",
            render: (_, record) => {
                if (record.wednesday.length > 0) {
                    return record.wednesday.map(res => {
                        if (res.startTime === null && res.endTime === null) {
                            return <Row className="mb-10" justify="center">
                                <span>N/A</span>
                            </Row>
                        } else {
                            if (res.status === false) {
                                return <Row className="mb-10" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            } else {
                                return <Row className="mb-10 c-red" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            }
                        }
                    })
                }
            }
        },
        {
            title: <IntlMessage id="thursday" />,
            dataIndex: "thursday",
            key: "thursday",
            align: "center",
            render: (_, record) => {
                if (record.thursday.length > 0) {
                    return record.thursday.map(res => {
                        if (res.startTime === null && res.endTime === null) {
                            return <Row className="mb-10" justify="center">
                                <span>N/A</span>
                            </Row>
                        } else {
                            if (res.status === false) {
                                return <Row className="mb-10" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            } else {
                                return <Row className="mb-10 c-red" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            }
                        }
                    })
                }
            }
        },
        {
            title: <IntlMessage id="friday" />,
            dataIndex: "friday",
            key: "friday",
            align: "center",
            render: (_, record) => {
                if (record.friday.length > 0) {
                    return record.friday.map(res => {
                        if (res.startTime === null && res.endTime === null) {
                            return <Row className="mb-10" justify="center">
                                <span>N/A</span>
                            </Row>
                        } else {
                            if (res.status === false) {
                                return <Row className="mb-10" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            } else {
                                return <Row className="mb-10 c-red" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            }
                        }
                    })
                }
            }
        },
        {
            title: <IntlMessage id="saturday" />,
            dataIndex: "saturday",
            key: "saturday",
            align: "center",
            render: (_, record) => {
                if (record.saturday.length > 0) {
                    return record.saturday.map(res => {
                        if (res.startTime === null && res.endTime === null) {
                            return <Row className="mb-10" justify="center">
                                <span>N/A</span>
                            </Row>
                        } else {
                            if (res.status === false) {
                                return <Row className="mb-10" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            } else {
                                return <Row className="mb-10 c-red" justify="center">
                                    <span>{moment(res.startTime).format("HH:mm A")} - {moment(res.endTime).format("HH:mm A")}</span>
                                </Row>
                            }
                        }
                    })
                }
            }
        },
    ]
    

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

            <HeaderPage id="time" button={buttonTem()} />


            <Table className="mt-30" dataSource={renderData} columns={columns} pagination={false} />


        </Fragment>
    )
}

export default Time