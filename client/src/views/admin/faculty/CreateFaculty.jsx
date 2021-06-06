import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Row, Col } from 'antd'
import IntlMessage from "../../../helpers/IntlMessages"
import HeaderPage from '../../../components/HeaderPage'
import baseAPI from '../../../api/baseAPI'

const CreateFaculty = () => {

    const history = useHistory()

    const onSubmit = values => {
        baseAPI.post(`/faculties`, values)
            .then(response => {
                console.log("Result: ", response)
                history.goBack()
            })
            .catch(err => console.log("Error: ", err))
    }

    const buttonTem = () => {
        return <Row justify="end">
            <Button className="btn-border-danger mr-10" size="large" onClick={() => { history.goBack() }}>
                <IntlMessage id="discard" />
            </Button>
            <Button className="btn-border-primary" size="large" htmlType="submit">
                <IntlMessage id="submit" />
            </Button>
        </Row>
    }

    const preventSubmit = (event) => {
        if(event.keyCode == 13) {
            event.preventDefault()
            return false
        }
    }

    return (
        <Fragment>
            <Form
                className="mt-30"
                name="basic"
                layout="vertical"
                onFinish={onSubmit}
                onKeyDown={event => preventSubmit(event)}
                onKeyPress={event => preventSubmit(event)}
                onKeyUp={event => preventSubmit(event)}
            >
                <HeaderPage id="create_faculty" button={buttonTem()} />

                <Row className="mb-20 mt-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="code" />}
                            name="facultyCode"
                            rules={[{ required: true, message: 'Please input faculty code!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Faculty Code" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="name" />}
                            name="facultyName"
                            rules={[{ required: true, message: 'Please input faculty name!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Faculty Name" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )
}

export default CreateFaculty
