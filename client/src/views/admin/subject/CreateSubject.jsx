import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Row, Col, InputNumber, Switch, Select } from 'antd'
import IntlMessage from "../../../helpers/IntlMessages"
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import { Helmet } from 'react-helmet'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'

const CreateSubject = () => {
    
    const history = useHistory()
    const { Option } = Select
    const [hasLab, setHasLab] = useState(false)
    const [users, setUsers] = useState(null)

    useEffect(() => {
        baseAPI.get('users')
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    if (users === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const onSubmit = values => {
        console.log("Values: ", values)
        values.hasLab = hasLab
        baseAPI.post(`/subjects`, values)
            .then(response => {
                console.log("Result: ", response)
                history.goBack()
            })
            .catch(err => console.log("Error: ", err))
    }

    const buttonTem = () => {
        return <Row justify="end">
            <Button className="btn-border-danger mr-10" size="large" onClick={() => { history.goBack() }}>
                <IntlMessage id="discard" />
            </Button>
            <Button className="btn-border-primary" size="large" htmlType="submit">
                <IntlMessage id="submit" />
            </Button>
        </Row>
    }

    const preventSubmit = (event) => {
        if(event.keyCode == 13) {
            event.preventDefault()
            return false
        }
    }

    const userOption = () => {
        return users.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.username}
            </Option>
        })
    }

    return (
        <Fragment>
            <IntlMessage id="subject">
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
                initialValues={{
                    "duration": 0,
                    "credit": 0
                }}
            >
                <HeaderPage id="create_subject" button={buttonTem()} />

                <Row className="mb-20 mt-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="code" />}
                            name="subjectCode"
                            rules={[{ required: true, message: 'Please input subject code!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Subject Code" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="name" />}
                            name="subjectName"
                            rules={[{ required: true, message: 'Please input subject name!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Subject Name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="lecturer" />}
                            name="user"
                            rules={[{ required: true, message: 'Please input subject name!' }]}
                        >
                            <Select mode="multiple" allowClear className="w-100 mt-5" placeholder="Select Lecturer" >
                                { userOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="duration_mn" />}
                            name="duration"
                            rules={[{ required: true, message: 'Please input duration!' }]}
                        >
                            <InputNumber min={0} placeholder="Enter Duration (minute)" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="credit" />}
                            name="credit"
                            rules={[{ required: true, message: 'Please input credit!' }]}
                        >
                            <InputNumber min={0} placeholder="Enter Credit" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Switch checked={hasLab} onChange={val => setHasLab(val)} />
                    <span className="ml-10 c-black"><IntlMessage id="has_lab" /></span>
                </Row>

                { hasLab ? <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="lab_duration_mn" />}
                            name="labDuration"
                            rules={[{ required: true, message: 'Please input lab duration!' }]}
                        >
                            <InputNumber min={0} placeholder="Enter Lab Duration (minute)" />
                        </Form.Item>
                    </Col>
                </Row> : <></> }

            </Form>
        </Fragment>
    )
}

export default CreateSubject