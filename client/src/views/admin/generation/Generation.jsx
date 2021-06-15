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
import moment from 'moment'

const Generation = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [generations, setGenerations] = useState(null)
    const [departments, setDepartments] = useState(null)

    useEffect(() => {
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

    if (generations === null || departments === null) {
        return <LoopCircleLoading color="#000000" />
    }

    console.log("De", departments)

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
                onClick={() => { history.push('generation/create') }}
            >
                <Row align="middle">
                    <FiPlusCircle className="mr-5" />
                    <IntlMessage id="generation" />
                </Row>
            </Button>
        </Row>
    }

    const tableData = () => {
        return generations.map((res, index) => {
            return {
                key: res._id,
                no: index+1,
                generation: res.generation,
                generationName: res.generationName,
                year: res.year,
                startedYear: res.startedYear,
                department: res.department,
                departmentName: departments.find(x => x._id === res.department) && departments.find(x => x._id === res.department).departmentName,
                subject: res.subject,
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
            title: <IntlMessage id="name" />,
            dataIndex: "generationName",
            key: "generationName",
            align: "center",
        },
        {
            title: <IntlMessage id="generation" />,
            dataIndex: "generation",
            key: "generation",
            align: "center",
        },
        {
            title: <IntlMessage id="department" />,
            dataIndex: "departmentName",
            key: "departmentName",
            align: "center",
        },
        {
            title: <IntlMessage id="year" />,
            dataIndex: "year",
            key: "year",
            align: "center",
        },
        {
            title: <IntlMessage id="start_year" />,
            dataIndex: "startedYear",
            key: "startedYear",
            align: "center",
            render: (_, record) => (
                <span>{moment(record.startedYear).format("YYYY")}</span>
            )
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
                            pathname: `generation/edit`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                    <FaEye size="20px" onClick={() => {
                        history.push({
                            pathname: `generation/view`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                </Space>
            )
        },
    ]

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

            <MainHeader search={searchTem()} button={buttonTem()} hasButton={true} />

            <span className="c-black mb-10"><IntlMessage id="total" />: {generations.length}</span>

            <Table dataSource={tableData()} columns={columns} />

        </Fragment>
    )
}

export default Generation