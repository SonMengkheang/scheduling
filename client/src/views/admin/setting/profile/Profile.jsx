import React, { useState, useEffect, Fragment } from 'react'
import { Form, Input, Button, Row, Upload, Col, Switch, Card, Avatar, message } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import baseAPI from '../../../../api/baseAPI'
import ImgCrop from 'antd-img-crop'
import empty from '../../../../assets/img/background/empty.jpg'
import * as user from '../../../../constants/variable'
import IntlMessage from "../../../../helpers/IntlMessages"
import HeaderPage from '../../../../components/HeaderPage'
import { LoopCircleLoading } from 'react-loadingg'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../../redux/auth/actions'
import axios from 'axios'
import Cookies from "js-cookie"
import { decryptPayload } from "../../../../helpers/cryptography"

const Profile = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [fileList, updateFileList] = useState([])
    const [ownProfile, setOwnProfile] = useState(null)
    const [departments, setDepartments] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const [roles, setRoles] = useState([])
    const [imageUrls, setImageUrls] = useState(null)
    const [changePwd, setChangePwd] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        baseAPI.get('/users/profile')
        .then(res => {
            setOwnProfile(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('subjects')
        .then(res => {
            setSubjects(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('departments')
        .then(res => {
            setDepartments(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('roles')
        .then(res => {
            setRoles(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        console.log(errorMessage)
    }, [errorMessage])

    if (ownProfile === null || departments === null || subjects === null || roles === null) {
        return <LoopCircleLoading color="#000000" />
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const customizeProps = {
        name: "userImage",
        multiple: false,
        accept: ".png, .jpeg, .jpg",
        listType: "text",
        onRemove: file => {
            updateFileList(null)
            setImageUrls(null)
        },
        beforeUpload: file => {
            updateFileList([file])
            getBase64(file, imageUrl =>
                setImageUrls(imageUrl)
            );
            console.log(fileList)
            return false
        },
        fileList
    }

    const onSubmit = value => {

        const formData = new FormData()
        formData.append("userImage", fileList[0])

        if (changePwd === true) {
            if (value.newpassword === value.confirmPassword) {
                if (fileList.length === 0) {
                    baseAPI.patch(`/users/profile/update`, value)
                        .then(response => {
                            console.log(response)
                            dispatch(logoutUser())
                            history.go(0)
                        })
                        .catch(error => {
                            setErrorMessage(error.response.data.error.message)
                            console.log(error.response.data.error.message)
                            message.error({
                                content: error.response.data.error.message,
                                className: 'custom-class',
                                style: {
                                    // marginTop: '20vh',
                                    fontSize: '20px'
                                },
                            })
                        })
                } else {
                    baseAPI.post(`/users/setImg`, formData)
                        .then((response) => {
                            value.userImage = response.data
                            baseAPI.patch(`/users/profile/update`, value)
                                .then(response => {
                                    console.log(response)
                                    dispatch(logoutUser())
                                    // history.push("/people/user/login")
                                    history.go(0)
                                })
                                .catch(error => {
                                    console.log(error)
                                })
                        })
                        .catch((error) => {
                            console.log(error)
                            setErrorMessage(error)
                        })
                }
            } else {
                message.error({
                    content: "Password not match",
                    className: 'custom-class',
                    style: {
                        fontSize: '20px'
                    },
                })
            }
        } else {
            if (fileList.length === 0) {
                baseAPI.patch(`/users/profile/update`, value)
                    .then(response => {
                        console.log(response)
                        history.go(0)
                    })
                    .catch(error => {
                        console.log(error)
                        setErrorMessage(error)
                    })
            } else {
                baseAPI.post(`/users/setImg`, formData)
                    .then((response) => {
                        value.userImage = response.data
                        baseAPI.patch(`/users/profile/update`, value)
                            .then(response => {
                                console.log(response)
                                history.go(0)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                        setErrorMessage(error)
                    })
            }
        }
        console.log("Result: ", value)
    }

    const buttonTem = () => {
        return <Row justify="end">
            <Button className="btn-border-primary" size="large" htmlType="submit">
                <IntlMessage id="update" />
            </Button>
        </Row>
    }

    const preventSubmit = (event) => {
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    }

    const photoPart = () => {
        return <Row justify="center">
            <Form.Item name="userImage" style={{ width: "95%" }}>
                <Card
                    style={{ width: "100%" }}
                    actions={[<ImgCrop rotate>
                        <Upload {...customizeProps}>
                            <span className="c-primary text-uppercase"><IntlMessage id="upload_pic" /></span>
                        </Upload>
                    </ImgCrop>]}
                >
                    {/* <Row justify="center" align="middle">
                        {imageUrls !== null ? <Avatar size={128} src={imageUrls} /> : <Avatar size={128} src={`http://${user.domain_name}:${user.port}/${ownProfile.userImage}`} />}
                    </Row> */}
                    <Row justify="center" align="middle">
                        {imageUrls !== null ? <Avatar size={128} src={imageUrls} /> : <Avatar size={128} src={`http://${user.domain_name}:${user.port}/${ownProfile.userImage}`} />}
                    </Row>
                    <Row className="mt-10" justify="center">
                        <span className="fw-bold fs-20">{ownProfile.firstName} {ownProfile.lastName} ({ownProfile.role})</span>
                    </Row>
                    <Row className="mt-10" justify="center">
                        <span className="c-black fs-16">{ownProfile.email}</span>
                    </Row>
                    <Row className="mt-10" justify="center">
                        <span className="c-black fs-16">{ownProfile.phoneNumber}</span>
                    </Row>
                </Card>
            </Form.Item>
        </Row>
    }

    const securityPart = () => {
        return changePwd === false ? <></> :
        <Row justify="center">
            <Card style={{ width: "98%" }}>
                <Row justify="space-between" align="middle">
                    <Col justify="center" align="middle" span={7}>
                        <Form.Item
                            style={{ width: "100%" }}
                            label={<IntlMessage id="old_pwd" />}
                            name="password"
                            rules={[{ required: true, message: 'Please input your old password!' }]}
                        >
                            <Input.Password className="input-box-style" placeholder="Enter Old Password" />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            style={{ width: "100%" }}
                            label={<IntlMessage id="pwd" />}
                            name="newpassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password className="input-box-style" placeholder="Enter Password" />
                        </Form.Item>
                    </Col>
                    <Col span={7}>
                        <Form.Item
                            style={{ width: "100%" }}
                            label={<IntlMessage id="confirm_pwd" />}
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input your password to confirm!' }]}
                        >
                            <Input.Password className="input-box-style" placeholder="Enter Confirm Password" />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Row>
    }

    const profilePart = () => {
        return <Row justify="center">
            <Card
                title={<span className="c-primary fw-bold fs-18"><IntlMessage id="profile" /></span>}
                style={{ width: "95%" }}
            >
                <Row justify="space-between" className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="first_name" />}
                            name="firstName"
                            rules={[{ required: true, message: 'Please input  firstname!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="last_name" />}
                            name="lastName"
                            rules={[{ required: true, message: 'Please input lastname!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Last Name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="space-between" className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="username" />}
                            name="username"
                            rules={[{ required: true, message: 'Please input username!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Username" />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="phone_number" />}
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input phonenumber!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Phone Number" />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Row>
    }

    return (
        <Fragment>
            <IntlMessage id="user">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <Form
                className="mt-30"
                name="basic"
                layout="vertical"
                onFinish={onSubmit}
                onKeyDown={event => preventSubmit(event)}
                onKeyPress={event => preventSubmit(event)}
                onKeyUp={event => preventSubmit(event)}
                initialValues={{
                    'teacherID': ownProfile.teacherID,
                    'firstName': ownProfile.firstName,
                    'lastName': ownProfile.lastName,
                    'username': ownProfile.username,
                    'email': ownProfile.email,
                    'phoneNumber': ownProfile.phoneNumber,
                    'userImage': ownProfile.userImage,
                }}
            >
                <HeaderPage id="profile" button={buttonTem()} />

                <Row justify="center" className="mt-20">
                    <Col span={9}>
                        { photoPart() }
                        <Row className="mb-20" justify="center">
                            <div style={{width: "95%"}}>
                                <Switch onChange={val => setChangePwd(val)} />
                                <span className="ml-10"><IntlMessage id="change_pwd" /></span>
                            </div>
                        </Row>
                    </Col>
                    <Col span={15}>
                        { profilePart() }
                    </Col>
                </Row>
                { securityPart() }
            </Form>
            <div className="pt-20"></div>
        </Fragment>
    )
}

export default Profile
