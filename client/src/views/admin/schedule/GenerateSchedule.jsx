import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Row, Col, Button, DatePicker, Select } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'
import ScheduleTableTemplate from '../../../components/ScheduleTableTemplate'

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

    const [users, setUsers] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const [userSubject, setUserSubject] = useState(null)

    const [departByFaculty, setDepartByFaculty] = useState(null)
    const [generationByDepart, setGenerationByDepart] = useState(null)
    const [classByGen, setClassByGen] = useState(null)
    const [submitSchedule, setSubmitSchedule] = useState(null)

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

        baseAPI.get('/users')
        .then(res => {
            setUsers(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('/subjects')
        .then(res => {
            setSubjects(res.data)
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

    useEffect(() => {
        if (classes !== null && classId !== null && subjects !== null) {
            let userSubject = []
            let findClass = classes.find(x => x._id === classId)
            findClass.userSubject.map(res => {
                let subject = subjects.find(x => x._id === res.subject)
                userSubject.push({
                    _id: res._id,
                    user: res.user,
                    subject: res.subject,
                    duration: subject.duration,
                    labDuration: subject.labDuration
                })
            })
            setUserSubject(userSubject)
        }
    }, [classId, classes, subjects])

    console.log("User Subject: ", userSubject)

    if (faculty === null || facId === null || genId === null || generation === null || department === null || departId === null || classes === null || classId === null || generationByDepart === null || departByFaculty === null || classByGen === null || users === null || subjects === null || userSubject === null) {
        return <LoopCircleLoading color="#000000" />
    }

    console.log("Submit: ", submitSchedule)
    const onGenerate = () => {
        let obj = {
            classId: classId,
            userSubject: userSubject
        }
        baseAPI.post('schedules/generate', obj)
            .then(res => setSubmitSchedule(res.data))
            .catch(err => console.log(err))
    }

    const buttonTem = () => {
        return <Row justify="end">
            <Button className="btn-border-danger mr-10" size="large" onClick={() => history.goBack()}>
                <IntlMessage id="discard" />
            </Button>
            <Button className="btn-border-primary" size="large" onClick={() => onGenerate()}>
                <IntlMessage id="generate" />
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
        baseAPI.post('/schedules/generate', val)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
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

    console.log("DepartID: ", departId)

    const infoPart = () => {
        return <div>
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
                        name="semesterDate"
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
                        name="facultyId"
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
                        name="departmentId"
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
                        name="generationId"
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
                        name="classId"
                        initialValue={classId}
                    >
                        <Select placeholder="Select Class">
                            { classOption() }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="english_class_date" />}
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
                <Col span={7}>
                    <Row className="fs-15 c-primary pb-8">
                        <span><IntlMessage id="english_class_time" /></span>
                    </Row>
                    <Row>
                        <RangePicker className="w-100" />
                    </Row>
                </Col>
            </Row>
            <Row className="mt-30" justify="space-between">
                <Col span={7}>
                    <Form.Item
                        label={<IntlMessage id="lecturer_priority" />}
                        name="priority"
                    >
                        <Select placeholder="Select Priority">
                            {/* { userPriority() } */}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    }

    // const userPriority = () => {
    //     return userSubject.map(res => {
    //         return <Option key={res._id} value={res.user}>
    //             {users.find(x => x._id === res.user).username} ({subjects.find(x => x._id === res.subject).subjectName})
    //         </Option>
    //     })
    // }

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

                { infoPart() }

                { submitSchedule !== null ? <ScheduleTableTemplate className="mt-40" schedules={submitSchedule} shift="M" /> : <></> }
                
            </Form>
        </Fragment>
    )
}

export default GenerateSchedule