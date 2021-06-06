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
} from "react-icons/fa"
import { GrCurrency } from 'react-icons/gr'
import { BiSupport } from "react-icons/bi"
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
        id: "year",
        icon: <FaChartPie size="25px" />,
        label: <IntlMessage id="year" />,
        subs: [
            {
                to: [
                    "/admin/year",
                    "/admin/year/create",
                    "/admin/year/edit",
                    "/admin/year/view",
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
            // {
            //     id: "store",
            //     icon: <GoSettings size="15px" />,
            //     label: <IntlMessage id="store" />,
            //     to: ["/app/setting/store_info"]
            // },
            // {
            //     id: "warehouse",
            //     icon: <GoSettings size="15px" />,
            //     label: <IntlMessage id="warehouse" />,
            //     to: ["/app/setting/warehouse_info"]
            // },
            // {
            //     id: "general",
            //     icon: <GoSettings size="15px" />,
            //     label: <IntlMessage id="general" />,
            //     to: ["/app/setting/general"]
            // },
            // {
            //     id: "role",
            //     icon: <FaUsersCog size="15px" />,
            //     label: <IntlMessage id="role" />,
            //     to: [
            //         "/app/setting/role",
            //         "/app/setting/role/create",
            //         "/app/setting/role/edit",
            //         "/app/setting/role/edit/view",
            //     ]
            // },
            // {
            //     id: "counter",
            //     icon: <RiComputerLine size="15px" />,
            //     label: <IntlMessage id="counter" />,
            //     to: [
            //         "/app/setting/counter",
            //         "/app/setting/counter/create",
            //         "/app/setting/counter/edit",
            //         "/app/setting/counter/view",
            //     ]
            // },
            // {
            //     id: "currency",
            //     icon: <GrCurrency size="15px" />,
            //     label: <IntlMessage id="currency" />,
            //     to: [
            //         "/app/setting/currency",
            //         "/app/setting/currency/create",
            //         "/app/setting/currency/edit",
            //         "/app/setting/currency/set",
            //     ]
            // },
            // {
            //     id: "profile",
            //     icon: <FaUserCircle size="17px" />,
            //     label: <IntlMessage id="profile" />,
            //     to: ["/app/setting/profile"]
            // }
        ]
    },
];
export default data;