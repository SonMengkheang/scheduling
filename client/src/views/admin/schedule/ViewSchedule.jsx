import React, { Fragment, useRef } from 'react'
import { useHistory } from 'react-router'
import { Row, Button } from 'antd'
import { useReactToPrint } from 'react-to-print'
import ScheduleTemplate from '../../../components/ScheduleTemplate'
import IntlMessages from '../../../helpers/IntlMessages'
import HeaderPage from '../../../components/HeaderPage'
import { Helmet } from 'react-helmet'

const ViewSchedule = () => {

    const history = useHistory()
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

    const buttonTem = () => {
        return <Row justify="end">
            <Button className="btn-border-danger mr-10" size="large" onClick={() => history.goBack()}>
                <IntlMessages id="back" />
            </Button>
            <Button className="btn-border-primary" size="large" onClick={() => handlePrint()} >
                <IntlMessages id="print" />
            </Button>
        </Row>
    }

    return (
        <Fragment>
            <IntlMessages id="schedule">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessages>

            <HeaderPage id="view_schedule" button={buttonTem()} />

            <div ref={componentRef} className="ml-20 mr-20">
                <ScheduleTemplate />
            </div>
        </Fragment>
    )
}

export default ViewSchedule