import React, {useState, useEffect} from 'react'
import { Row, Col } from "antd"
// import fixedBg from "../assets/img/background/balloon.jpg"
// import useFetchingData from '../hooks/useFetchingData'
// import baseUrl from '../api/baseAPI'
// import { domain_name, port } from '../constants/variable'
import 'antd/dist/antd.css'
import "../assets/scss/style.scss"
import feLogo from '../assets/img/logos/FE_Logo.png'

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

    return (
        <div className="auth__container w-100 h-100">
            <Row className="h-100" align="middle" justify="center">
                <Col>
                    {/* <Card className="card-layer"> */}
                        <Row className="top-logo mb-20" justify="center" align="middle">
                            <img alt="auth-logo" width="70" height="70" src={feLogo} />
                        </Row>
                        <div>
                            {props.children }
                        </div>
                    {/* </Card> */}
                </Col>
            </Row>
        </div>
    );
};

export default AuthenticationLayout