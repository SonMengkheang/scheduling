import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Input, Button, Table, Space } from 'antd'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'
import MainHeader from '../../../components/MainHeader'
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading'
import { FiPlusCircle } from 'react-icons/fi'

const Schedule = () => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")
    const [schedules, setSchedules] = useState([])

    if (schedules === null) {
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
        // {
        //     title: <IntlMessage id="start_year" />,
        //     dataIndex: "startedYear",
        //     key: "startedYear",
        //     align: "center",
        //     render: (_, record) => (
        //         <span>{moment(record.startedYear).format("YYYY")}</span>
        //     )
        // },
    ]



    const buttonTem = () => {
        return <Row>
            <Button
                size="large"
                className="btn-border-primary"
                onClick={() => { history.push('schedule/generate') }}
            >
                <Row align="middle">
                    <IntlMessage id="generate_schedule" />
                </Row>
            </Button>
            <Button
                size="large"
                className="btn-border-primary ml-10"
                onClick={() => { history.push('schedule/create') }}
            >
                <Row align="middle">
                    <IntlMessage id="create_schedule" />
                </Row>
            </Button>
        </Row>
    }

    return (
        <Fragment>
            <IntlMessage id="schedule">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <MainHeader search={searchTem()} button={buttonTem()} hasButton={true} />

            <span className="c-black mb-10"><IntlMessage id="total" />: {schedules.length}</span>

            <Table dataSource={tableData()} columns={columns} />

        </Fragment>
    )
}

export default Schedule