import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Row, Col, Select } from 'antd'
import IntlMessage from "../../../helpers/IntlMessages"
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import { LoopCircleLoading } from 'react-loadingg'
import { Helmet } from 'react-helmet'

const CreateClasses = () => {

    const history = useHistory()
    const { Option } = Select
    const [departments, setDepartments] = useState(null)
    const [departId, setDepartId] = useState(null)
    const [generations, setGenerations] = useState(null)
    const [genId, setGenId] = useState(null)
    const [generationByDepart, setGenerationByDepart] = useState(null)

    useEffect(() => {
        baseAPI.get('generations')
        .then(res => {
            setGenerations(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('departments')
        .then(res => {
            setDepartments(res.data)
            setDepartId(res.data[0]._id)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log("1")
        if (generations !== null && generations.length > 0 && departId !== null) {
            let arr = []
            generations.map(res => {
                if (res.department === departId) {
                    arr.push(res)
                }
            })
            console.log("arr: ", arr)
            setGenerationByDepart(arr)
            setGenId(arr[0]._id)
        }
    }, [departId, generations])

    if (departments === null || generations === null || departId === null || generationByDepart === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const onSubmit = values => {
        console.log("Values: ", values)
        baseAPI.post(`/classes`, values)
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

    const generationOption = () => {
        return generationByDepart.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.generationName}
            </Option>
        })
    }

    return (
        <Fragment>
            <IntlMessage id="class">
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
                <HeaderPage id="create_class" button={buttonTem()} />

                <Row className="mb-20 mt-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="code" />}
                            name="classesCode"
                            rules={[{ required: true, message: 'Please input classes code!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Classes Code" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mt-20 mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="name" />}
                            name="classesName"
                            rules={[{ required: true, message: 'Please input classes name!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Classes Name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="department" />}
                            name="department"
                            initialValue={departId}
                            rules={[{ required: true, message: 'Please select department!' }]}
                        >
                            <Select value={departId} placeholder="Select Department" onChange={val => setDepartId(val)}>
                                { departmentOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="generation" />}
                            name="generation"
                            // initialValue={genId}
                            values={genId}
                            rules={[{ required: true, message: 'Please select generation!' }]}
                        >
                            <Select value={genId} placeholder="Select Generation" onChange={val => setGenId(val)}>
                                { generationOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="shift" />}
                            name="shift"
                            rules={[{ required: true, message: 'Please input shift!' }]}
                        >
                            <Select placeholder="Select Generation">
                                <Option key="morning" value="M"><IntlMessage id="morning" /></Option>
                                <Option key="afternoon" value="A"><IntlMessage id="afternoon" /></Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                
            </Form>
        </Fragment>
    )
}

export default CreateClasses
