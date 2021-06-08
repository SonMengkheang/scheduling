import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Select } from 'antd'
import IntlMessage from "../../../helpers/IntlMessages"
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import { Helmet } from 'react-helmet'
import { LoopCircleLoading } from 'react-loadingg'

const EditDepartment = () => {

    const history = useHistory()
    const location = useLocation()
    const { Option } = Select
    const [faculty, setFaculty] = useState(null)

    useEffect(() => {
        baseAPI.get('faculties')
        .then(res => {
            setFaculty(res.data)
        })
    }, [])

    if (faculty === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const onSubmit = values => {
        console.log("Values: ", values)
        baseAPI.patch(`/departments/${location.state.key}`, values)
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

    const facultyOption = () => {
        return faculty.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.facultyName}
            </Option>
        })
    }

    return (
        <Fragment>
            <IntlMessage id="department">
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
                    "departmentCode": location.state.departmentCode,
                    "departmentName": location.state.departmentName,
                    "faculty": location.state.faculty
                }}
            >
                <HeaderPage id="create_department" button={buttonTem()} />

                <Row className="mb-20 mt-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="code" />}
                            name="departmentCode"
                            rules={[{ required: true, message: 'Please input department code!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Department Code" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="name" />}
                            name="departmentName"
                            rules={[{ required: true, message: 'Please input department name!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Department Name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="faculty" />}
                            name="faculty"
                            rules={[{ required: true, message: 'Please select faculty!' }]}
                        >
                            <Select placeholder="Select Faculty">
                                { facultyOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )
}

export default EditDepartment
