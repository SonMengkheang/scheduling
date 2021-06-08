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
import { role } from '../../../lang/locals/en-us'

const User = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [users, setUsers] = useState(null)
    const [departments, setDepartments] = useState(null)
    const [generations, setGenerations] = useState(null)
    const [roles, setRoles] = useState(null)

    useEffect(() => {
        baseAPI.get('users')
        .then(res => {
            console.log(res.data)
            setUsers(res.data)
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

        baseAPI.get('roles')
        .then(res => {
            setRoles(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    if (users === null || generations === null || departments === null || roles === null) {
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
                onClick={() => { history.push('user/create') }}
            >
                <Row align="middle">
                    <FiPlusCircle className="mr-5" />
                    <IntlMessage id="user" />
                </Row>
            </Button>
        </Row>
    }

    const tableData = () => {
        return users.map((res, index) => {
            return {
                key: res._id,
                no: index+1,
                teacherID: res.teacherID,
                firstName: res.firstName,
                lastName: res.lastName,
                username: res.username,
                userImage: res.userImage,
                email: res.email,
                phoneNumber: res.phoneNumber,
                role: res.role,
                roleName: roles.find(x => x._id === res.role).roleName,
                password: res.password,
                department: res.department,
                subject: res.subject,
                freeTime: res.freeTime,
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
            title: <IntlMessage id="teacher_id" />,
            dataIndex: "teacherID",
            key: "teacherID",
            align: "center",
        },
        {
            title: <IntlMessage id="username" />,
            dataIndex: "username",
            key: "username",
            align: "center",
        },
        {
            title: <IntlMessage id="email" />,
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: <IntlMessage id="role" />,
            dataIndex: "roleName",
            key: "roleName",
            align: "center",
        },
        {
            title: <IntlMessage id="phone_number" />,
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            align: "center",
        },
        {
            title: <IntlMessage id="image" />,
            dataIndex: "userImage",
            key: "userImage",
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
                            pathname: `user/edit`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                    <FaEye size="20px" onClick={() => {
                        history.push({
                            pathname: `user/view`,
                            state: record
                        })
                    }} style={{ cursor: "pointer" }} className="c-primary" />
                </Space>
            )
        },
    ]

    return (
        <Fragment>
            <IntlMessage id="user">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <MainHeader search={searchTem()} button={buttonTem()} hasButton={true} />

            <span className="c-black mb-10"><IntlMessage id="total" />: {users.length}</span>

            <Table dataSource={tableData()} columns={columns} />

        </Fragment>
    )
}

export default User