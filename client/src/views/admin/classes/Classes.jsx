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

const Classes = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [classes, setClasses] = useState(null)
    const [departments, setDepartments] = useState(null)
    const [generations, setGenerations] = useState(null)

    useEffect(() => {
        baseAPI.get('classes')
        .then(res => {
            console.log(res.data)
            setClasses(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('generations')
        .then(res => {
            setGenerations(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('departments')
        .then(res => {
            setDepartments(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    if (classes === null || generations === null || departments === null) {
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
                onClick={() => { history.push('class/create') }}
            >
                <Row align="middle">
                    <FiPlusCircle className="mr-5" />
                    <IntlMessage id="class" />
                </Row>
            </Button>
        </Row>
    }

    const tableData = () => {
        return classes.map((res, index) => {
            return {
                key: res._id,
                no: index+1,
                classesCode: res.classesCode,
                classesName: res.classesName,
                department: res.department,
                departmentName: departments.find(x => x._id === res.department).departmentName,
                generation: res.generation,
                generationName: generations.find(x => x._id === res.generation).generationName,
                shift: res.shift,
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
            dataIndex: "classesCode",
            key: "classesCode",
            align: "center",
        },
        {
            title: <IntlMessage id="name" />,
            dataIndex: "classesName",
            key: "classesName",
            align: "center",
        },
        {
            title: <IntlMessage id="department" />,
            dataIndex: "departmentName",
            key: "departmentName",
            align: "center",
        },
        {
            title: <IntlMessage id="generation" />,
            dataIndex: "generationName",
            key: "generationName",
            align: "center",
        },
        {
            title: <IntlMessage id="shift" />,
            dataIndex: "shift",
            key: "shift",
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
                            pathname: `class/edit`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                    <FaEye size="20px" onClick={() => {
                        history.push({
                            pathname: `class/view`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                </Space>
            )
        },
    ]

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

            <MainHeader search={searchTem()} button={buttonTem()} hasButton={true} />

            <span className="c-black mb-10"><IntlMessage id="total" />: {classes.length}</span>

            <Table dataSource={tableData()} columns={columns} />

        </Fragment>
    )
}

export default Classes