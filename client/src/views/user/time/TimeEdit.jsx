import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Form, Row, Col, Button, TimePicker } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import moment from 'moment'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'

const TimeEdit = () => {

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
        let freeTime = {
            freeTime: val
        }

        baseAPI.patch(`/users/profile/update`, freeTime)
            .then(response => {
                console.log(response)
                history.go(0)
            })
            .catch(error => {
                console.log(error)
            })
        console.log("Val: ", freeTime)
    }

    const timeList = (val, init) => {
        return <Form.List name={val}>
            {(fields, { add, remove }) => (
                <div>
                    {fields.map((field, index) => (
                        <Row key={field.key}>
                            {console.log("DFS", init[index].time[1])}
                            <Col className="mr-20">
                                <Form.Item
                                    label={index === 0 ? <IntlMessage id={val} /> : ""}
                                    name={[index, 'time']}
                                >
                                    <TimePicker.RangePicker />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                                <MinusCircleOutlined className={index === 0 ? "mt-40" : "mt-10"} onClick={() => remove(field.name)} />
                            </Col>
                        </Row>
                    ))}

                    <Form.Item>
                        <Button className="btn-primary" onClick={() => add()}>
                            <IntlMessage id={val} />
                        </Button>
                    </Form.Item>
                </div>
            )}
        </Form.List>
    }

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
                // initialValues={{
                //     "monday": curUser.freeTime.monday,
                // }}
            >
                <HeaderPage id="edit" button={buttonTem()} />

                <Row justify="space-between" className="mt-30">
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
                </Row>
                
            </Form>


        </Fragment>
    )
}

export default TimeEdit