import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Input, Button, Table } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import MainHeader from '../../../components/MainHeader'
import { FiPlusCircle } from 'react-icons/fi'

const Classes = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [classes, setClasses] = useState([])

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
                generation: res.generation,
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
            dataIndex: "department",
            key: "year",
            align: "center",
        },
        {
            title: <IntlMessage id="generation" />,
            dataIndex: "generation",
            key: "generation",
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