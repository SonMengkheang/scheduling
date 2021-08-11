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

const Subject = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [subjects, setSubjects] = useState(null)
    const [users, setUsers] = useState(null)

    useEffect(() => {
        baseAPI.get('subjects')
            .then(res => {
                setSubjects(res.data)
            })
            .catch(err => console.log(err))

        baseAPI.get('users')
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    if (subjects === null || users === null) {
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
                onClick={() => { history.push('subject/create') }}
            >
                <Row align="middle">
                    <FiPlusCircle className="mr-5" />
                    <IntlMessage id="subject" />
                </Row>
            </Button>
        </Row>
    }

    const tableData = () => {
        return subjects.map((res, index) => {
            return {
                key: res._id,
                no: index+1,
                subjectCode: res.subjectCode,
                subjectName: res.subjectName,
                user: res.user,
                duration: res.duration,
                credit: res.credit,
                hasLab: res.hasLab,
                labDuration: res.labDuration,
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
            dataIndex: "subjectCode",
            key: "subjectCode",
            align: "center",
        },
        {
            title: <IntlMessage id="name" />,
            dataIndex: "subjectName",
            key: "subjectName",
            align: "center",
        },
        {
            title: <IntlMessage id="lecturer" />,
            dataIndex: "user",
            key: "user",
            align: "center",
            width: "10%",
            render: (_, record) => {
                return record.user.map(res => {
                    return <Row justify="center">
                        <span>{users.find(x => x._id === res).username}</span>
                    </Row>
                })
            }
        },
        {
            title: <IntlMessage id="duration" />,
            dataIndex: "duration",
            key: "duration",
            align: "center",
            render: (_, record) => (
                <span>{record.duration}<IntlMessage id="mn" /></span>
            )
        },
        {
            title: <IntlMessage id="duration" />,
            dataIndex: "labDuration",
            key: "labDuration",
            align: "center",
            render: (_, record) => (
                record.hasLab ? <span>{record.labDuration}<IntlMessage id="mn" /></span> : <span>N/A</span>
            )
        },
        {
            title: <IntlMessage id="credit" />,
            dataIndex: "credit",
            key: "credit",
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
                            pathname: `subject/edit`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                    {/* <FaEye size="20px" onClick={() => {
                        history.push({
                            pathname: `subject/view`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" /> */}
                </Space>
            )
        },
    ]

    return (
        <Fragment>
            <IntlMessage id="subject">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <MainHeader search={searchTem()} button={buttonTem()} hasButton={true} />

            <span className="c-black mb-10"><IntlMessage id="total" />: {subjects.length}</span>

            <Table dataSource={tableData()} columns={columns} />

        </Fragment>
    )
}

export default Subject