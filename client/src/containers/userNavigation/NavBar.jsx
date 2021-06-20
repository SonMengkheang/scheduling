import React, { Fragment, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Layout } from "antd"
import { Row, Menu, Dropdown } from 'antd'
import { domain_name, port } from '../../constants/variable.js'
import { logoutUser } from "../../redux/auth/actions"
import { BiSupport } from "react-icons/bi"
import { GoSettings } from "react-icons/go"
import { BsPeopleCircle } from "react-icons/bs"
import { RiLogoutCircleLine } from "react-icons/ri"
import { changeLocale } from "../../redux/setting/actions";
import { localeOptions } from "../../constants/defaultValues";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
// import useFetchingData from '../../hooks/useFetchingData'
import baseUrl from '../../api/baseAPI'
import kh from '../../assets/img/flags/kh.svg'
import us from '../../assets/img/flags/us.svg'
import Logo from '../../assets/img/logos/RUPP_logo.png'

const NavBar = () => {

    const { Header } = Layout
    const currentUser = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const locale = useSelector(state => state.settings.locale)
    const getLang = localStorage.getItem('currentLanguage')
    const [lang, setLang] = useState(getLang === "en" ? "English" : "Khmer")
    const [generalInfo, setGeneralInfo] = useState()
    let word = kh

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

    useEffect(() => {
        if (getLang === "en") {
            setLang("English")
        } else if (getLang === "km") {
            setLang("Khmer")
        }
    }, [lang, getLang])

    const dropDownMenuItem = (
        <Menu>
            <Menu.Item key="0">
                <Link to="/user/profile">
                    <Row align="middle">
                        <BsPeopleCircle className="mr-10" />
                        <span>Profile</span>
                    </Row>
                </Link>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="2">
                <Link to="/login" onClick={() => dispatch(logoutUser())}>
                    <RiLogoutCircleLine className="mr-10" />
                    Logout
                </Link>
            </Menu.Item>
        </Menu>

    )

    const onRenderLanguageMenu = () => {
        return (
            <Menu>
                {
                    localeOptions.map(l => {
                        return (
                            <Menu.Item key={l.id} onClick={() => dispatch(changeLocale(l.id))}>
                               {l.icon} { l.name}
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        )
    }

    return (
        <Fragment>
            <Header className="navbar fixed-top">
                <Row justify="space-between" style={{width: "100%"}}>
                    <Link to="/admin/department">
                        <img className="ml-20" alt="auth-logo" width="53" height="53" src={Logo} />
                        <span className="ml-10 fs-18 fw-bold c-black">Modern Scheduling</span>
                    </Link>
                    <Row className="navbar-right mr-20" justify="end" align="middle">
                        <div className="mr-10">
                            <Dropdown overlay={onRenderLanguageMenu()} trigger={['click']}>
                                <Link to="#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    { getLang === "en" ? <img style={{width: "20px"}} src={us} /> : <img style={{width: "20px"}} src={kh} /> }
                                    <span className="fs-14 c-black mr-5 ml-5">
                                        {lang} 
                                    </span>
                                    <DownOutlined size="10px"/>
                                </Link>
                            </Dropdown>
                        </div>
                        <div className="user d-inline-block">
                            <Dropdown overlay={dropDownMenuItem} placement="bottomCenter" trigger={['click']}>
                                <div className="ant-dropdown-link">
                                    <span className="fs-16 fw-bold">{currentUser.isLoggedIn && currentUser.user.username}</span>
                                    <img src={currentUser.isLoggedIn && `http://${domain_name}:${port}/${currentUser.user.userImage}`} alt="user-profile-img" />
                                </div>
                            </Dropdown>
                        </div>
                    </Row>
                </Row>
            </Header>
        </Fragment>
    )
}

export default NavBar
