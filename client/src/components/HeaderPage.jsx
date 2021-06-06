import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Row, Col, Affix } from 'antd'
import IntlMessage from '../helpers/IntlMessages'
import { RiArrowGoBackLine } from 'react-icons/ri'

const HeaderPage = props => {

    const history = useHistory()
    const location = useLocation()

    return (
        <Affix offsetTop={location.pathname === "/app/inventory_management/po/print" || location.pathname === "/app/inventory_management/receive_po/print" ? 0 : 70}>
            <Row justify="space-between" align="middle" className="bg-white pt-20 pb-10">
                <Col span={12}>
                    <Row justify="start" align="middle">
                        {props.hasBackButton === true ? <RiArrowGoBackLine className="mr-10 c-black" size="20px" onClick={() => { history.goBack() }} style={{ cursor: "pointer" }} /> : <></> }
                        <span className="text-uppercase fw-bold h5 c-black">
                            <IntlMessage id={props.id} />
                        </span>
                    </Row>
                </Col>
                <Col span={12}>
                    {props.button}
                </Col>
            </Row>
        </Affix>
    )
}

export default HeaderPage
