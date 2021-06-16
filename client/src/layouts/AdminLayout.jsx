import React, { Fragment, useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector} from "react-redux"
import { IntlProvider } from "react-intl"
import NavBar from "../containers/navigation/NavBar"
import SideBar from "../containers/navigation/SideBar"
import AppLocale from "../lang"
import Cookies from "js-cookie"

import 'antd/dist/antd.css'
import "../assets/scss/style.scss"

const AdminLayout = props => {

    // const [hide, setHide] = useState(false)
    // const location = useLocation()
    const history = useHistory()
    
    const locale = useSelector(state => state.settings.locale)
    const loading = useSelector(state => state.auth.loading)
    console.log("Local:", locale)
    const currentAppLocale = AppLocale[locale]

    console.log("Cookie124: ", Cookies.get("_scheduling_session"))

    if(loading === true) {
        history.go(0)
    }

    // useEffect(() => {
    //     if (location.pathname === "/app/inventory_management/po/print" || location.pathname === "/app/inventory_management/receive_po/print") {
    //         setHide(true)
    //     } else {
    //         setHide(false)
    //     }
    // }, [location.pathname])

    return (
        <Fragment>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}
            >
                <div id="app-container">
                    <NavBar />
                    <SideBar />
                    <main>
                        { props.children }
                    </main>
                </div> 
            </IntlProvider>
        </Fragment>
    )
}

export default AdminLayout
