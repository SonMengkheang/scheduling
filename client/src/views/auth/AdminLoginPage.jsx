import React, { useState, useEffect } from "react"
import { Redirect, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login } from "../../redux/auth/actions"
import { Form, Input, Button, Row, Col } from "antd"
import { Mail, Eye } from "react-feather"
import Cookies from "js-cookie"
import IntlMessage from "../../helpers/IntlMessages"

const AdminLoginPage = () => {

    const currentUser = useSelector(state => state.auth)
    const history = useHistory()
    const dispatch = useDispatch()
    const [errMessage, setErrMessage] = useState(null)
    
    const onSubmit = values => {
        const { email, password } = values
        dispatch(login(email, password))
    }

    console.log("CurrUser: ", errMessage)

    useEffect(() => {
        if (currentUser.errorMessage !== undefined) {
            setErrMessage(currentUser.errorMessage)
        }
    }, [currentUser])

    useEffect(() => {
        if (errMessage !== null) {
            const timer = setTimeout(() => {
                setErrMessage(null)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [errMessage])

    //verify role after login
    if(currentUser.isLoggedIn) {
        const { role } = currentUser.user
        if (role === "Admin") {
            return (
                <div>
                    <Redirect to="/admin/faculty" />
                </div>
            )
        } else if(role === "Lecturer") {
            return (
                <div>
                    <Redirect to="/user/schedule" />
                </div>
            )
        }
    }

    if(typeof Cookies.get("_scheduling_session") !== "undefined") {
        return <div>Loading...</div>
    }

    return (
        <Form 
            onFinish={ onSubmit } 
            layout="vertical"
        >
            <Row justify="center">
                <Col span={20}>
                    <Form.Item
                        // label="Email"
                        name="email"
                        className="mb-15"
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
                                <Mail size={20} strokeWidth={1} className="c-primary mr-5" />
                            }
                            style={{height: "50px", borderRadius: "10px"}}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={20}>
                    <Form.Item
                        // label="Password"
                        name="password"
                        className="mb-2"
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
                                    size={20}
                                    strokeWidth={1}
                                    className="c-primary mr-5"
                                />
                            } 
                            style={{height: "50px", borderRadius: "10px"}}
                        />
                    </Form.Item>
                </Col>
            </Row>
            { errMessage !== null ? <Row>
                <span style={{color: "#ff4d4f"}}>{errMessage}</span>
            </Row> : <></> }
            <Row justify="center" align="middle" className="mt-30">
                <Button 
                    htmlType="submit" 
                    className="btn-border-primary"
                    size="large"
                >
                    Login
                </Button>
            </Row>
        </Form>
    )
}

export default AdminLoginPage
