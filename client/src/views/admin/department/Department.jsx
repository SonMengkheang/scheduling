import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Input, Button, Table, Space } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import MainHeader from '../../../components/MainHeader'
import { FiPlusCircle } from 'react-icons/fi'
import baseAPI from '../../../api/baseAPI'
import { LoopCircleLoading } from 'react-loadingg'
import { RiEditFill } from 'react-icons/ri'
import { FaEye } from 'react-icons/fa'

const Department = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [departments, setDepartments] = useState(null)
    const [faculty, setFaculty] = useState(null)

    useEffect(() => {
        baseAPI.get('departments')
        .then(res => {
            setDepartments(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('faculties')
        .then(res => {
            setFaculty(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    if (departments === null || faculty === null) {
        return <LoopCircleLoading color="#000000" />
    }

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

    const buttonTem = () => {
        return <Row>
            <Button
                size="large"
                className="btn-border-primary"
                onClick={() => { history.push('department/create') }}
            >
                <Row align="middle">
                    <FiPlusCircle className="mr-5" />
                    <IntlMessage id="department" />
                </Row>
            </Button>
        </Row>
    }

    const tableData = () => {
        return departments.map((res, index) => {
            return {
                key: res._id,
                no: index+1,
                departmentCode: res.departmentCode,
                departmentName: res.departmentName,
                faculty: res.faculty,
                facultyName: faculty.find(x => x._id === res.faculty) && faculty.find(x => x._id === res.faculty).facultyName
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
            title: <IntlMessage id="code" />,
            dataIndex: "departmentCode",
            key: "departmentCode",
            align: "center",
        },
        {
            title: <IntlMessage id="name" />,
            dataIndex: "departmentName",
            key: "departmentName",
            align: "center",
        },
        {
            title: <IntlMessage id="faculty" />,
            dataIndex: "facultyName",
            key: "facultyName",
            align: "center",
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
                            pathname: `department/edit`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                    {/* <FaEye size="20px" onClick={() => {
                        history.push({
                            pathname: `department/view`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" /> */}
                </Space>
            )
        },
    ]

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

            <MainHeader search={searchTem()} button={buttonTem()} hasButton={true} />

            <span className="c-black mb-10"><IntlMessage id="total" />: {departments.length}</span>

            <Table dataSource={tableData()} columns={columns} />

        </Fragment>
    )
}

export default Department