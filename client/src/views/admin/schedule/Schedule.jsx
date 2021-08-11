import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Input, Button, Table, Space } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import MainHeader from '../../../components/MainHeader'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'
import baseAPI from '../../../api/baseAPI'
import { FiPlusCircle } from 'react-icons/fi'
import moment from 'moment'
import { RiEditFill } from 'react-icons/ri'
import { FaEye } from 'react-icons/fa'

const Schedule = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [schedules, setSchedules] = useState(null)
    const [classes, setClasses] = useState(null)
    const [departments, setDepartments] = useState(null)
    const [generations, setGenerations] = useState(null)
    const [faculty, setFaculty] = useState(null)

    useEffect(() => {
        baseAPI.get('/schedules')
            .then(res => {
                setSchedules(res.data)
            })
            .catch(err => console.log(err))

        baseAPI.get('/classes')
            .then(res => {
                setClasses(res.data)
            })
            .catch(err => console.log(err))

        baseAPI.get('/departments')
            .then(res => {
                setDepartments(res.data)
            })
            .catch(err => console.log(err))

        baseAPI.get('/generations')
            .then(res => {
                setGenerations(res.data)
            })
            .catch(err => console.log(err))

        baseAPI.get('/faculties')
            .then(res => {
                setFaculty(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    if (schedules === null || classes === null || departments === null || generations === null || faculty === null) {
        return <LoopCircleLoading color="#000000" />
    }

    console.log("Departement: ", departments)

    const searchTem = () => {
        return <Row>
            <Input
                autoFocus={true}
                size="large"
                className="search-box-style"
                placeholder="Search"
                value={searchValue}
                // onChange={val => onSearchChange(val, searchType)}
                // onChange={searchData}
                // onSearch={val => onSearch(val, searchType)}
            />
        </Row>
    }

    const tableData = () => {
        return schedules.map((res, index) => {
            console.log("Depart Id: ", )
            return {
                no: index + 1,
                key: res._id,
                classId: res.classId,
                classesName: classes.find(x => x._id === res.classId).classesName,
                facultyId: res.facultyId,
                facultyName: faculty.find(x => x._id === res.facultyId).facultyName,
                departmentId: res.departmentId,
                departmentName: departments.find(x => x._id === res.departmentId).departmentName,
                generationId: res.generationId,
                generationName: generations.find(x => x._id === res.generationId).generationName,
                semester: res.semester,
                semesterDate: res.semesterDate,
                finalExamDate: res.finalExamDate,
                schedule: res.schedule
            }
        })
    }

    const columns = [
        {
            title: <IntlMessage id="no" />,
            dataIndex: "no",
            key: "no",
            width: "7%",
            align: "center",
        },
        {
            title: <IntlMessage id="class" />,
            dataIndex: "classesName",
            key: "classesName",
            align: "center",
        },
        {
            title: <IntlMessage id="semester" />,
            dataIndex: "semester",
            key: "semester",
            align: "center",
        },
        {
            title: <IntlMessage id="semester_date" />,
            dataIndex: "semesterDate",
            key: "semesterDate",
            align: "center",
            render: (_, record) => {
                return <Row className="mb-10" justify="center">
                    <span>{moment(record.semesterDate.startDate).format("YYYY-MM-DD")} - {moment(record.semesterDate.endDate).format("YYYY-MM-DD")}</span>
                </Row>
            }
        },
        {
            title: <IntlMessage id="final_exam_date" />,
            dataIndex: "fianlExamDate",
            key: "fianlExamDate",
            align: "center",
            render: (_, record) => {
                return <Row className="mb-10" justify="center">
                    <span>{moment(record.finalExamDate.startDate).format("YYYY-MM-DD")} - {moment(record.finalExamDate.endDate).format("YYYY-MM-DD")}</span>
                </Row>
            }
        },
        {
            title: <IntlMessage id="action" />,
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (_, record) => (
                <Space size="middle">
                    <RiEditFill size="20px" onClick={() => {
                        history.push({
                            pathname: `schedule/edit`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                    <FaEye size="20px" onClick={() => {
                        history.push({
                            pathname: `schedule/view`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                </Space>
            )
        },
    ]



    const buttonTem = () => {
        return <Row>
            {/* <Button
                size="large"
                className="btn-border-primary"
                onClick={() => { history.push('schedule/generate') }}
            >
                <Row align="middle">
                    <IntlMessage id="generate_schedule" />
                </Row>
            </Button> */}
            <Button
                size="large"
                className="btn-border-primary ml-10"
                onClick={() => { history.push('schedule/create') }}
            >
                <Row align="middle">
                    <IntlMessage id="create_schedule" />
                </Row>
            </Button>
        </Row>
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

            <MainHeader search={searchTem()} button={buttonTem()} hasButton={true} />

            <span className="c-black mb-10"><IntlMessage id="total" />: {schedules.length}</span>

            <Table dataSource={tableData()} columns={columns} />

        </Fragment>
    )
}

export default Schedule