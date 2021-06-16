import React, { useState, useEffect, Fragment } from 'react'
import { Form, Input, Button, Row, Upload, Select, Col, Switch, Card, Avatar } from 'antd'
import { useHistory } from 'react-router-dom'
import baseAPI from '../../../api/baseAPI'
import ImgCrop from 'antd-img-crop'
import empty from '../../../assets/img/background/empty.jpg'
import IntlMessage from "../../../helpers/IntlMessages"
import HeaderPage from '../../../components/HeaderPage'
import { LoopCircleLoading } from 'react-loadingg'
import { Helmet } from 'react-helmet'

const CreateUser = () => {

    const history = useHistory()
    const { Option } = Select
    const [fileList, updateFileList] = useState([])
    const [departments, setDepartments] = useState(null)
    const [classes, setClasses] = useState(null)
    const [subjects, setSubjects] = useState(null)
    const [roles, setRoles] = useState([])
    const [imageUrls, setImageUrls] = useState(null)

    useEffect(() => {
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

        baseAPI.get('classes')
        .then(res => {
            setClasses(res.data)
        })
        .catch(err => console.log(err))

        baseAPI.get('roles')
        .then(res => {
            setRoles(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    if (departments === null || subjects === null || roles === null || classes === null) {
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

        if (value.password === value.confirmPassword) {
            if (fileList.length === 0) {
                baseAPI.post(`/users/create`, value)
                    .then(response => {
                        console.log(response)
                        history.go(-1)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                baseAPI.post(`/users/setImg`, formData)
                    .then((response) => {
                        value.userImage = response.data
                        baseAPI.post(`/users/create`, value)
                            .then(response => {
                                console.log(response)
                                history.go(-1)
                            })
                            .catch(error => {
                                console.log(error)
                            })
                        console.log(response)
                        console.log(value.userimage)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        }
        else {
            alert("Password not match")
            console.log("Password not match");
        }
        console.log("Result: ", value)
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
                    <Row justify="center" align="middle">
                        {imageUrls !== null ? <Avatar size={128} src={imageUrls} /> : <Avatar size={128} src={empty} />}
                    </Row>
                </Card>
            </Form.Item>
        </Row>
    }

    const rolePart = () => {
        return <Row justify="center">
            <Card
                style={{ width: "95%" }}
                title={<span className="c-primary fw-bold fs-18"><IntlMessage id="role" /></span>}
            >
                <Row>
                    <Form.Item
                        style={{ width: "100%" }}
                        name="role"
                        label={<IntlMessage id="role" />}
                        // rules={[{ required: true, message: 'Please select your role!' }]}
                    >
                        <Select placeholder="Please select a role">
                            {roleOption()}
                        </Select>
                    </Form.Item>
                </Row>
            </Card>
        </Row>
    }

    const securityPart = () => {
        return <Row justify="center" className="mt-20">
            <Card
                title={<span className="c-primary fw-bold fs-18">{<IntlMessage id="security" />}</span>}
                style={{width: "95%"}}
            >
                <Row>
                    <Form.Item
                        style={{ width: "100%" }}
                        label={<IntlMessage id="pwd" />}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className="input-box-style" placeholder="Enter Password" />
                    </Form.Item>
                </Row>
                <Row>
                    <Form.Item
                        style={{ width: "100%" }}
                        label={<IntlMessage id="confirm_pwd" />}
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please input your password to confirm!' }]}
                    >
                        <Input.Password className="input-box-style" placeholder="Enter Confirm Password" />
                    </Form.Item>
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
                            label={<IntlMessage id="email" />}
                            name="email"
                            rules={[{ required: true, message: 'Please input email!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="space-between" className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="phone_number" />}
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input phonenumber!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Phone Number" />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="teacher_id" />}
                            name="teacherID"
                            rules={[{ required: true, message: 'Please input teacher id!' }]}
                        >
                            <Input className="input-box-style" placeholder="Enter Teacher ID" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="space-between" className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="department" />}
                            name="department"
                            // rules={[{ required: true, message: 'Please input department!' }]}
                        >
                            <Select mode="multiple" allowClear placeholder="Select Department">
                                { departmentOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="subject" />}
                            name="subject"
                            // rules={[{ required: true, message: 'Please input subject!' }]}
                        >
                            <Select mode="multiple" allowClear placeholder="Select subject">
                                { subjectOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify="space-between" className="mb-20">
                    <Col span={11}>
                        <Form.Item
                            label={<IntlMessage id="class" />}
                            name="classes"
                            // rules={[{ required: true, message: 'Please input department!' }]}
                        >
                            <Select mode="multiple" allowClear placeholder="Select Class">
                                { classesOption() }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </Row>
    }

    const departmentOption = () => {
        return departments.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.departmentName}
            </Option>
        })
    }

    const classesOption = () => {
        return classes.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.classesName}
            </Option>
        })
    }

    const subjectOption = () => {
        return subjects.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.subjectName}
            </Option>
        })
    }

    const roleOption = () => {
        return roles.map(res => {
            return <Option key={res._id} value={res._id}>
                {res.roleName}
            </Option>
        })
    }

    return (
        <Fragment className="container">
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
            >
                <HeaderPage id="create_user" button={buttonTem()} />

                <Row justify="center" className="mt-20">
                    <Col span={9}>
                        { photoPart() }
                        { rolePart() }
                        { securityPart() }
                    </Col>
                    <Col span={15}>
                        { profilePart() }
                    </Col>
                </Row>
            </Form>
            <div className="pt-20"></div>
        </Fragment>
    )
}

export default CreateUser
