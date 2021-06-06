import React, {useState} from 'react'
import { Row, Col, Card, Affix } from 'antd'
import { RiToolsFill } from 'react-icons/ri'
import { BiDownArrow, BiUpArrow, BiSearch } from 'react-icons/bi'
import IntlMessages from '../helpers/IntlMessages'

const MainHeader = props => {

    const [onOpen, setOnOpen] = useState(true)

    const hasButtonTool = () => {
        return <div className="bg-white pt-10 pb-10">
            <Row justify="space-between">
                <Col span={11}>
                    <Row justify="center" align="middle">
                        <BiSearch className="mr-5" />
                        <IntlMessages id="search" />
                    </Row>
                </Col>
                <Col span={11}>
                    <Row justify="center" align="middle">
                        <Col span={23} align="middle">
                            <Row justify="center" align="middle">
                                <RiToolsFill className="mr-5" /> 
                                <IntlMessages id="tool" />
                            </Row>
                        </Col>
                        <Col>
                            {onOpen === true ? <BiUpArrow onClick={() => setOnOpen(false)} /> : <BiDownArrow onClick={() => setOnOpen(true)} />}
                        </Col>
                    </Row>
                </Col>
            </Row>

            {onOpen === true ? <div className="mb-10">
                <Row className="mt-5" justify="space-between" align="middle" >
                    <Col span={11}>
                        <Card>
                            {props.search}
                        </Card> 
                    </Col>
                    <Col span={11} align="center">
                        <Card>
                            {props.button}
                        </Card>
                    </Col>
                </Row>
            </div> : <div className="mb-10"></div>}
        </div>
    }

    const noButtonTool = () => {
        return <div className="bg-white pt-10 pb-10">
            <Row justify="space-between">
                <Col span={23}>
                    <Row justify="center" align="middle">
                        <BiSearch className="mr-5" />
                        <IntlMessages id="search" />
                    </Row>
                </Col>
                <Col>
                    {onOpen === true ? <BiUpArrow onClick={() => setOnOpen(false)} /> : <BiDownArrow onClick={() => setOnOpen(true)} />}
                </Col>
            </Row>

            {onOpen === true ? <div className="mb-10">
                <Row className="mt-5" justify="center" align="middle" >
                    <Col span={24}>
                        <Card>
                            {props.search}
                        </Card> 
                    </Col>
                </Row>
            </div> : <div className="mb-10"></div>}
        </div>
    }

    return (
        <Affix offsetTop={70}>
            { props.hasButton ? hasButtonTool() : noButtonTool() }
        </Affix>
    )
}

export default MainHeader
