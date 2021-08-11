import React, {useState, useEffect} from 'react'
import { Row, Col, Card } from "antd"
// import fixedBg from "../assets/img/background/balloon.jpg"
// import useFetchingData from '../hooks/useFetchingData'
// import baseUrl from '../api/baseAPI'
// import { domain_name, port } from '../constants/variable'
import 'antd/dist/antd.css'
import "../assets/scss/style.scss"
import feLogo from '../assets/img/logos/FE_Logo.png'
import backgroudImg from '../assets/img/background/STEM.png'

const AuthenticationLayout = props => {

    // const fixedBgStyle = {
    //     background: `url(${fixedBg}) no-repeat center center fixed`
    // }

    // const [generalInfo, setGeneralInfo] = useState()
    // sessionStorage.removeItem("ActiveSidebar")

    // const onFetchGeneralData = useFetchingData({
    //     api: baseUrl,
    //     method: "get",
    //     url: "/settings/general/6013cbc4b151211eb09c1fa9",
    //     config: null
    // })

    // useEffect(() => {
    //     if (onFetchGeneralData.response !== null) {
    //         setGeneralInfo(onFetchGeneralData.response)
    //     }
    // }, [onFetchGeneralData.response])

    const fixedBgStyle = {
        backgroundImage: `url(${backgroudImg})`,
        backgroundSize: "cover",
        position: "fixed"
        // opacity: 0.75
    }

    const backgroundColor = {
        background: "linear-gradient(120deg, #2980b9, #8e44ad)"
    }

    return (
        <div className="auth__container w-100 h-100" style={{background: "linear-gradient(120deg, #2980b9, #8e44ad)"}}>
            <Row className="h-100" align="middle" justify="center">
                {/* <Col> */}
                    <Card style={{width: "500px", borderRadius: "5%", boxShadow: "10px 5px 5px #626262"}}>
                        <Row style={{height: "50px"}} />
                        <Row className="top-logo mb-20" justify="center" align="middle">
                            <img alt="auth-logo" width="100" height="100" src={feLogo} />
                        </Row>
                        <Row justify="center" align="middle" className="fs-30 fw-bold mb-30">
                            <span>Login Page</span>
                        </Row>
                        <div>
                            { props.children }
                        </div>
                        <Row style={{height: "50px"}} />
                    </Card>
                {/* </Col> */}
            </Row>
        </div>
    );
};

export default AuthenticationLayout