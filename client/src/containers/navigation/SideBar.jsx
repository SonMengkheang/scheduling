import React, { useState, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom'
import "antd/dist/antd.css"
import { Menu, Row } from "antd"
import menuItems from "../../constants/menuList"
import PerfectScrollbar from "react-perfect-scrollbar"

const NewSideBar = (props) => {

    const location = useLocation()
    const [seletedItem, setSeletedItem] = useState({ current: menuItems[0].id });
    const [subSeletedItem, setSubSelectedItem] = useState({ subCurrent: "" })

    useEffect(() => {
        menuItems && menuItems.map(item => {
            item.subs && item.subs.map(sub => {
                sub.to && sub.to.map(to => {
                    if (location.pathname === to) {
                        setSeletedItem({ current: item.id })
                        setSubSelectedItem({ subCurrent: sub.id })
                    }
                })
            })
        })
    }, [location.pathname])

    // useEffect(() => {
    //     setActiveSidebar({
    //         subSeletedItem: subSeletedItem.subCurrent,
    //         seletedItem: seletedItem.current
    //     })
    // }, [subSeletedItem, seletedItem])

    // const onSeletedItem = (e) => {
    //     console.log("Click: ", e);
    //     setSeletedItem({ current: e.key });
    // };

    // const onSubSelectedItem = e => {
    //     setSubSelectedItem({ subCurrent: e.key })
    // }

    const mainMenu = () => {
        return (
            <Menu selectedKeys={[seletedItem.current]}>
                {menuItems &&
                    menuItems.map(item => {
                        return (
                            <Menu.Item key={item.id}>
                                <Link to={item.subs[0].to[0]}>
                                    <Row justify="center">
                                        {item.icon}
                                    </Row>
                                    <Row justify="center">
                                        {item.label}
                                    </Row>
                                </Link>
                            </Menu.Item>
                        )
                    })}
            </Menu>
        )
    }

    const subMenu = () => {
        return (
            menuItems &&
            menuItems.map((items, index) => {
                return (
                    <Menu key={index} selectedKeys={[subSeletedItem.subCurrent]} style={{ display: seletedItem.current === items.id ? "flex" : "none" }}
                    >
                        {items.subs &&
                            items.subs.map((item) => {
                                return <Menu.Item key={item.id}>
                                    <Link to={item.to[0]}>
                                        <Row justify="center" align="middle">
                                            {item.icon}
                                            <span className="mr-10" />
                                            {item.label}
                                        </Row>
                                    </Link>
                                </Menu.Item>
                            })}
                    </Menu>
                )
            })
        )
    }

    return (
        <div className="new-side-bar">
            <div className="scroll">
                <PerfectScrollbar
                    style={{
                        position: "fixed",
                        overflow: "auto",
                        zIndex: "1"
                    }}
                    option={{ suppressScrollX: true }}
                >
                    <div className="new-main-menu">
                        {mainMenu()}
                    </div>
                </PerfectScrollbar>
            </div>
            <Row justify='center'>
                <div className="new-sub-menu">
                    {subMenu()}
                </div>
            </Row>
        </div>
    )
}

export default NewSideBar