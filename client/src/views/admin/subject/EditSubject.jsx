import React, { Fragment, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Form, Input, Button, Row, Col, InputNumber, Switch } from 'antd'
import IntlMessage from "../../../helpers/IntlMessages"
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import { Helmet } from 'react-helmet'

const CreateSubject = () => {
    
    const history = useHistory()
    const location = useLocation()
    const [hasLab, setHasLab] = useState(location.state.hasLab)

    const onSubmit = values => {
        console.log("Values: ", values)
        values.hasLab = hasLab
        baseAPI.patch(`/subjects/${location.state.key}`, values)
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
                <IntlMessage id="update" />
            </Button>
        </Row>
    }

    const preventSubmit = (event) => {
        if(event.keyCode == 13) {
            event.preventDefault()
            return false
        }
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
                    "subjectCode": location.state.subjectCode,
                    "subjectName": location.state.subjectName,
                    "duration": location.state.duration,
                    "credit": location.state.credit,
                    "labDuration": location.state.labDuration,
                }}
            >
                <HeaderPage id="edit_subject" button={buttonTem()} />

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
                            label={<IntlMessage id="duration_mn" />}
                            name="duration"
                            rules={[{ required: true, message: 'Please input subject name!' }]}
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
                            rules={[{ required: true, message: 'Please input subject name!' }]}
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