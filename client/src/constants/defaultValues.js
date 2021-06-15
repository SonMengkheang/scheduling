import React from 'react'
import kh from '../assets/img/flags/kh.svg'
import us from '../assets/img/flags/us.svg'

export const defaultLocale = "en"

export const localeOptions = [
    { id: "en", name: "English", icon: <img style={{width: "16px"}} src={us} /> },
    // { id: "fr", name: "French" },
    // { id: "cn", name: "Chinese" },
    { id: "km", name: "Khmer", icon: <img style={{width: "16px"}} src={kh} /> }
]