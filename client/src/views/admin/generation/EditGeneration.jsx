import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Form, Input, Button, Row, Col, InputNumber, Select, DatePicker } from 'antd'
import IntlMessage from "../../../helpers/IntlMessages"
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import { LoopCircleLoading } from 'react-loadingg'
import { Helmet } from 'react-helmet'
import moment from 'moment'

const EditGeneration = () => {

    const history = useHistory()
    const location = useLocation()
    const { Option } = Select
    const [departments, setDepartments] = useState(null)
    const [subjects, setSubjects] = useState(null)

    useEffect(() => {
        baseAPI.get('subjects')
        .then(res => {
            setSubjects(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('departments')
        .then(res => {
            setDepartments(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    if (departments === null || subjects === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const onSubmit = values => {
        console.log("Values: ", values)
        baseAPI.patch(`/generations/${location.state.key}`, values)
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

    const departmentOption = () => {
        return departments.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.departmentName}
            </Option>
        })
    }

    const subjectOption = () => {
        return subjects.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.subjectName}
            </Option>
        })
    }

    return (
        <Fragment>
            <IntlMessage id="generation">
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
                    "generationName": location.state.generationName,
                    "year": location.state.year,
                    "generation": location.state.generation,
                    "department": location.state.department,
                    "startedYear": moment(location.state.startedYear),
                    "subject": location.state.subject,
                }}
            >
                <HeaderPage id="edit_generation" button={buttonTem()} />

                {/* <Row className="mb-20 mt-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="code" />}
                            name="generationCode"
                            rules={[{ required: true, message: 'Please input generation code!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Generation Code" />
                        </Form.Item>
                    </Col>
                </Row> */}

                <Row className="mt-20 mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="name" />}
                            name="generationName"
                            rules={[{ required: true, message: 'Please input generation name!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Generation Name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="year" />}
                            name="year"
                            rules={[{ required: true, message: 'Please input year!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Year" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="generation" />}
                            name="generation"
                            rules={[{ required: true, message: 'Please input generation!' }]}
                        >
                            <InputNumber min={0} placeholder="Enter Generation" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="department" />}
                            name="department"
                            rules={[{ required: true, message: 'Please select department!' }]}
                        >
                            <Select placeholder="Select Department">
                                { departmentOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="start_year" />}
                            name="startedYear"
                            rules={[{ required: true, message: 'Please select started year!' }]}
                        >
                            <DatePicker defaultValue={moment(location.state.startedYear)} className="w-100" picker="year" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="subject" />}
                            name="subject"
                            rules={[{ required: true, message: 'Please select subject!' }]}
                        >
                            <Select mode="multiple" allowClear placeholder="Select Subject">
                                { subjectOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                
            </Form>
        </Fragment>
    )
}

export default EditGeneration
