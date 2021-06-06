import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Input, Button, Table } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import MainHeader from '../../../components/MainHeader'
import { FiPlusCircle } from 'react-icons/fi'

const Subject = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [subjects, setSubjects] = useState([])

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
                duration: res.duration,
                credit: res.credit,
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
            title: <IntlMessage id="duration" />,
            dataIndex: "duration",
            key: "duration",
            align: "center",
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