import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Input, Button, Table } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import MainHeader from '../../../components/MainHeader'
import { FiPlusCircle } from 'react-icons/fi'

const Generation = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [generations, setgenerations] = useState([])

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
            dataIndex: "department",
            key: "department",
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