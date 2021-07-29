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
    const [users, setUsers] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userByDepart, setUserByDepart] = useState(null)

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

        baseAPI.get('users')
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (generations !== null && generations.length > 0 && departId !== null) {
            let arr = []
            generations.map(res => {
                if (res.department === departId) {
                    arr.push(res)
                }
            })
            console.log("arr: ", arr)
            if (arr.length === 0) {
                setGenerationByDepart(arr)
                setGenId("default")
            } else {
                setGenerationByDepart(arr)
                setGenId(arr[0]._id)
            }
        }
    }, [departId, generations])

    useEffect(() => {
        if (users !== null && users.length > 0 && departId !== null) {
            let arr = []
            users.map(res => {
                console.log("Res: ", res)
                let id
                if (res.department.length > 0 || res.department !== null) {
                    res.department.map(result => {
                        if (result === departId) {
                            id = result
                        }
                    })
                }
                console.log("Id: ", id)
                if (id !== null && id !== undefined) {
                    arr.push(res)
                }
            })
            console.log("arr: ", arr)
            if (arr.length === 0) {
                setUserByDepart(arr)
                setUserId("default")
            } else {
                setUserByDepart(arr)
                setUserId([arr[0]._id])
            }
        }
    }, [departId, users])

    if (departments === null || generations === null || users === null || departId === null || generationByDepart === null || genId === null || userId === null || userByDepart === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const onSubmit = values => {
        console.log("Values: ", values)
        values.department = departId
        values.generation = genId
        values.user = userId
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
        if (generationByDepart.length > 0) {
            return generationByDepart.map(res => {
                return <Option key={res._id} value={res._id}>
                    {res.generationName}
                </Option>
            })
        } else {
            return <Option key="default" value="default">
                Default
            </Option>
        }
    }

    const userOption = () => {
        if (userByDepart.length > 0) {
            return userByDepart.map(res => {
                return <Option key={res._id} value={res._id}>
                    {res.username}
                </Option>
            })
        } else {
            return <Option key="default" value="default">
                Default
            </Option>
        }
    }

    console.log("User Id: ", userId)

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

                <Row className="mb-40">
                    <Col span={11}>
                        <Row>
                            <span className="c-require fs-20 mr-5">*</span>
                            <span className="c-primary fs-16"><IntlMessage id="department" /></span>
                        </Row>
                        <Select className="w-100 mt-5" value={departId} placeholder="Select Department" onChange={val => setDepartId(val)}>
                            { departmentOption() }
                        </Select>
                    </Col>
                </Row>

                <Row className="mb-40">
                    <Col span={11}>
                        <Row>
                            <span className="c-require fs-20 mr-5">*</span>
                            <span className="c-primary fs-16"><IntlMessage id="generation" /></span>
                        </Row>
                        <Select className="w-100 mt-5" value={genId} placeholder="Select Generation" onChange={val => setGenId(val)}>
                            { generationOption() }
                        </Select>
                    </Col>
                </Row>

                <Row className="mb-40">
                    <Col span={11}>
                        <Row>
                            <span className="c-require fs-20 mr-5">*</span>
                            <span className="c-primary fs-16"><IntlMessage id="lecturer" /></span>
                        </Row>
                        <Select mode="multiple" allowClear className="w-100 mt-5" value={userId} placeholder="Select Lecturer" onChange={val => setUserId(val)}>
                            { userOption() }
                        </Select>
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
