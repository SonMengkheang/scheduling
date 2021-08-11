import React from "react"
import IntlMessage from '../helpers/IntlMessages'
import {
    AiFillSchedule,
    AiOutlineFieldTime
} from "react-icons/ai"
import {
    FaSchool,
    FaChartPie,
    FaBookOpen,
    FaUsersCog,
    FaUserCircle,
} from "react-icons/fa"
import { SiGoogleclassroom } from 'react-icons/si'

const data = [
    {
        id: "schedule",
        icon: <AiFillSchedule size="25px" />,
        label: <IntlMessage id="schedule" />,
        subs: [
            {
                to: ["/user/schedule"]
            }
        ]
    },
    {
        id: "class",
        icon: <SiGoogleclassroom size="25px" />,
        label: <IntlMessage id="class" />,
        subs: [
            {
                to: ["/user/class"]
            }
        ]
    },
    {
        id: "time",
        icon: <AiOutlineFieldTime size="25px" />,
        label: <IntlMessage id="time" />,
        subs: [
            {
                to: ["/user/time"],
                to: ["/user/time/edit"],
            }
        ]
    },
    {
        id: "profile",
        icon: <FaUserCircle size="15px" />,
        label: <IntlMessage id="profile" />,
        subs: [
            {
                to: ["/user/profile"]
            }
        ]
    },
]

export default data
