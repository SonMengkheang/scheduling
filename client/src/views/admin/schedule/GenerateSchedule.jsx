import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Row, Col, Button, DatePicker, Select } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'

const GenerateSchedule = () => {

    const history = useHistory()
    const { Option } = Select
    const { RangePicker } = DatePicker

    const [classes, setClasses] = useState(null)
    const [classId, setClassId] = useState(null)
    const [generation, setGeneration] = useState(null)
    const [genId, setGenId] = useState(null)
    const [department, setDepartment] = useState(null)
    const [departId, setDepartId] = useState(null)
    const [faculty, setFaculty] = useState(null)
    const [facId, setFacId] = useState(null)

    const [departByFaculty, setDepartByFaculty] = useState(null)
    const [generationByDepart, setGenerationByDepart] = useState(null)
    const [classByGen, setClassByGen] = useState(null)

    useEffect(() => {
        baseAPI.get('/classes')
        .then(res => {
            setClasses(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('/generations')
        .then(res => {
            setGeneration(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('/departments')
        .then(res => {
            setDepartment(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('/faculties')
        .then(res => {
            setFaculty(res.data)
            setFacId(res.data[0]._id)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (department !== null && department.length > 0 && facId !== null) {
            let arr = []
            department.map(res => {
                if (res.faculty === facId) {
                    arr.push(res)
                }
            })
            console.log("arr: ", arr)
            if (arr.length === 0) {
                setDepartByFaculty(arr)
                setDepartId("default")
            } else {
                setDepartId(arr[0]._id)
                setDepartByFaculty(arr)
            }
        }
    }, [facId, department])

    useEffect(() => {
        if (generation !== null && generation.length > 0 && departId !== null) {
            let arr = []
            generation.map(res => {
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
    }, [departId, generation])

    useEffect(() => {
        if (classes !== null && classes.length > 0 && genId !== null) {
            let arr = []
            classes.map(res => {
                if (res.generation === genId) {
                    arr.push(res)
                }
            })
            console.log("arr: ", arr)
            if (arr.length === 0) {
                setClassByGen(arr)
                setClassId("default")
            } else {
                setClassByGen(arr)
                setClassId(arr[0]._id)
            }
        }
    }, [genId, classes])

    if (faculty === null || facId === null || genId === null || generation === null || department === null || departId === null || classes === null || classId === null || generationByDepart === null || departByFaculty === null || classByGen === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const buttonTem = () => {
        return <Row justify="end">
            <Button className="btn-border-danger mr-10" size="large" onClick={() => history.goBack()}>
                <IntlMessage id="discard" />
            </Button>
            <Button className="btn-border-primary" size="large" htmlType="submit">
                <IntlMessage id="generate" />
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

    }

    const facultyOption = () => {
        return faculty.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.facultyName}
            </Option>
        })
    }

    const departmentOption = () => {
        if (departByFaculty.length > 0) {
            return departByFaculty.map(res => {
                return <Option key={res._id} value={res._id}>
                    {res.departmentName}
                </Option>
            })
        } else {
            return <Option key="default" value="default">
                Default
            </Option>
        }
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

    const classOption = () => {
        if (classByGen.length > 0) {
            return classByGen.map(res => {
                return <Option key={res._id} value={res._id}>
                    {res.classesName}
                </Option>
            })
        } else {
            return <Option key="default" value="default">
                Default
            </Option>
        }
    }

    return (
        <Fragment>
            <IntlMessage id="schedule">
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
                <HeaderPage id="generate_schedule" button={buttonTem()} />

                <Row className="mt-30" justify="space-between">
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="semester" />}
                            name="semester"
                        >
                            <Select placeholder="Select Semester">
                                <Option value={1} key={1}>1</Option>
                                <Option value={2} key={2}>2</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="semester_start" />}
                            name="semesterStartDate"
                        >
                            <RangePicker className="w-100" />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="final_exam" />}
                            name="finalExamDate"
                        >
                            <RangePicker className="w-100" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mt-30" justify="space-between">
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="faculty" />}
                            name="faculty"
                            initialValue={facId}
                        >
                            <Select placeholder="Select Faculty" value={facId} onChange={val => setFacId(val)}>
                                { facultyOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="department" />}
                            name="department"
                            initialValue={departId}
                        >
                            <Select placeholder="Select Department" value={departId} onChange={val => setDepartId(val)}>
                                { departmentOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="generation" />}
                            name="generation"
                            initialValue={genId}
                        >
                            <Select placeholder="Select Generation">
                                { generationOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mt-30" justify="space-between">
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="class" />}
                            name="classes"
                            initialValue={classId}
                        >
                            <Select placeholder="Select Class">
                                { classOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            label={<IntlMessage id="english_class" />}
                            name="englishClass"
                        >
                            <Select placeholder="Select English Class">
                                <Option value="monday" key="monday"><IntlMessage id="monday" /></Option>
                                <Option value="tuesday" key="tuesday"><IntlMessage id="tuesday" /></Option>
                                <Option value="wednesday" key="wednesday"><IntlMessage id="wednesday" /></Option>
                                <Option value="thursday" key="thursday"><IntlMessage id="thursday" /></Option>
                                <Option value="friday" key="friday"><IntlMessage id="friday" /></Option>
                                <Option value="saturday" key="saturday"><IntlMessage id="saturday" /></Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={7} />
                </Row>
                
            </Form>
        </Fragment>
    )
}

export default GenerateSchedule