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
import Cookies from "js-cookie"

const Faculty = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
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
                onClick={() => { history.push('faculty/create') }}
            >
                <Row align="middle">
                    <FiPlusCircle className="mr-5" />
                    <IntlMessage id="faculty" />
                </Row>
            </Button>
        </Row>
    }

    const tableData = () => {
        return faculty.map((res, index) => {
            return {
                key: res._id,
                no: index+1,
                facultyCode: res.facultyCode,
                facultyName: res.facultyName,
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
            dataIndex: "facultyCode",
            key: "facultyCode",
            align: "center",
        },
        {
            title: <IntlMessage id="name" />,
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
                            pathname: `faculty/edit`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                    {/* <FaEye size="20px" onClick={() => {
                        history.push({
                            pathname: `faculty/view`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" /> */}
                </Space>
            )
        },
    ]

    // console.log("Cookie: ", Cookies.get("_scheduling_session"))

    return (
        <Fragment>
            <IntlMessage id="faculty">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <MainHeader search={searchTem()} button={buttonTem()} hasButton={true} />

            <span className="c-black mb-10"><IntlMessage id="total" />: {faculty.length}</span>

            <Table dataSource={tableData()} columns={columns} />

        </Fragment>
    )
}

export default Faculty