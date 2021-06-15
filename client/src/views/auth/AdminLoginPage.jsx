import React from "react"
import { Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login } from "../../redux/auth/actions"
import { Form, Input, Button, Row } from "antd"
import { Mail, Eye } from "react-feather"
import Cookies from "js-cookie"


const AdminLoginPage = () => {

    const currentUser = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onSubmit = values => {

        const { email, password } = values
        dispatch(login(email, password))
    }

    //verify role after login
    if(currentUser.isLoggedIn) {
        const { role } = currentUser.user
        if(role === "Admin") {
            return <Redirect to="/admin/faculty" />
        }
    }

    if(typeof Cookies.get("_scheduling_session") !== "undefined") {
        return <div>Loading...</div>
    }

    return (
        <Form onFinish={ onSubmit } layout="vertical">
            <Form.Item
                // label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: 'Invalid Email',
                    }
                ]}
            >
                <Input
                    placeholder="input email address"
                    prefix={
                    <Mail size={16} strokeWidth={1} className="c-primary mr-5" />
                }/>
            </Form.Item>
            <Form.Item
                // label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    }
                ]}
            >
                <Input.Password
                    placeholder="input email password"
                    prefix={
                    <Eye
                        size={16}
                        strokeWidth={1}
                        className="c-primary mr-5"
                    />
                } />
            </Form.Item>
            <Row justify="center" align="middle">
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn-primary">
                        login
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default AdminLoginPage
