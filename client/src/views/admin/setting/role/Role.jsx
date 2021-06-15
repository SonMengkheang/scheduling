import React, { useState, useEffect, Fragment } from 'react'
import { Row, Input, Table } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../../helpers/IntlMessages'
import MainHeader from '../../../../components/MainHeader'
import baseAPI from '../../../../api/baseAPI'
import { LoopCircleLoading } from 'react-loadingg'

const Faculty = () => {

    const [searchValue, setSearchValue] = useState("")
    const [roles, setRoles] = useState(null)

    useEffect(() => {
        baseAPI.get('roles')
        .then(res => {
            setRoles(res.data)
        })
    }, [])

    if (roles === null) {
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

    const tableData = () => {
        return roles.map((res, index) => {
            return {
                key: res._id,
                no: index+1,
                roleName: res.roleName,
                description: res.description,
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
            dataIndex: "roleName",
            key: "roleName",
            align: "center",
        },
        {
            title: <IntlMessage id="description" />,
            dataIndex: "description",
            key: "description",
            align: "center",
        },
    ]

    return (
        <Fragment>
            <IntlMessage id="role">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <MainHeader search={searchTem()} hasButton={false} />

            <span className="c-black mb-10"><IntlMessage id="total" />: {roles.length}</span>

            <Table dataSource={tableData()} columns={columns} />

        </Fragment>
    )
}

export default Faculty