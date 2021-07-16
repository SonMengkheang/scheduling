import React from "react"
import {
    IoIosPeople,
    IoIosSchool
} from "react-icons/io"
import {
    AiFillSchedule
} from "react-icons/ai"
import {
    FaSchool,
    FaChartPie,
    FaBookOpen,
    FaUsersCog,
    FaUserCircle,
} from "react-icons/fa"
import { SiGoogleclassroom } from 'react-icons/si'
import { GoSettings } from "react-icons/go"
import IntlMessage from '../helpers/IntlMessages'

const data = [
    // {
    //     id: "dashboard",
    //     icon: <RiDashboardFill size="25px" />,
    //     label: <IntlMessage id="dashboard" />,
    //     subs: [
    //         {
    //             to: [
    //                 "/app/dashboard"
    //             ]
    //         }
    //     ]
    // },
    {
        id: "faculty",
        icon: <FaSchool size="25px" />,
        label: <IntlMessage id="faculty" />,
        subs: [
            {
                to: [
                    "/admin/faculty",
                    "/admin/faculty/create",
                    "/admin/faculty/edit",
                    "/admin/faculty/view",
                ]
            },
        ]
    },
    {
        id: "department",
        icon: <IoIosSchool size="25px" />,
        label: <IntlMessage id="department" />,
        subs: [
            {
                to: [
                    "/admin/department",
                    "/admin/department/create",
                    "/admin/department/edit",
                    "/admin/department/view",
                ]
            },
        ]
    },
    {
        id: "subject",
        icon: <FaBookOpen size="25px" />,
        label: <IntlMessage id="subject" />,
        subs: [
            {
                to: [
                    "/admin/subject",
                    "/admin/subject/create",
                    "/admin/subject/edit",
                    "/admin/subject/view",
                ]
            },
        ]
    },
    {
        id: "generation",
        icon: <FaChartPie size="25px" />,
        label: <IntlMessage id="generation" />,
        subs: [
            {
                to: [
                    "/admin/generation",
                    "/admin/generation/create",
                    "/admin/generation/edit",
                    "/admin/generation/view",
                ]
            },
        ]
    },
    {
        id: "classes",
        icon: <SiGoogleclassroom size="25px" />,
        label: <IntlMessage id="class" />,
        subs: [
            {
                to: [
                    "/admin/class",
                    "/admin/class/create",
                    "/admin/class/edit",
                    "/admin/class/view",
                ]
            },
        ]
    },
    {
        id: "schedule",
        icon: <AiFillSchedule size="25px" />,
        label: <IntlMessage id="schedule" />,
        subs: [
            {
                to: [
                    "/admin/schedule",
                    "/admin/schedule/create",
                    "/admin/schedule/edit",
                    "/admin/schedule/view",
                ]
            },
        ]
    },
    {
        id: "user",
        icon: <IoIosPeople size="25px" />,
        label: <IntlMessage id="user" />,
        subs: [
            {
                to: [
                    "/admin/user",
                    "/admin/user/create",
                    "/admin/user/edit",
                    "/admin/user/view",
                ]
            },
        ]
    },
    {
        id: "setting",
        icon: <GoSettings size="25px" />,
        label: <IntlMessage id="setting" />,
        subs: [
            {
                id: "general",
                icon: <GoSettings size="15px" />,
                label: <IntlMessage id="general" />,
                to: ["/admin/setting/general"]
            },
            {
                id: "role",
                icon: <FaUsersCog size="15px" />,
                label: <IntlMessage id="role" />,
                to: [
                    "/admin/setting/role",
                    "/admin/setting/role/edit/view",
                ]
            },
            {
                id: "profile",
                icon: <FaUserCircle size="15px" />,
                label: <IntlMessage id="profile" />,
                to: ["/admin/setting/profile"]
            },
        ]
    },
]

export default data