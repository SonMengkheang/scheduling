import baseAPI from "../api/baseAPI"
import Cookies from "js-cookie"
import { encryptPayload } from "./cryptography"
import cookiesConfig from "./cookiesConfig"
import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
        Cookies.set('_scheduling_session', encryptPayload(token), cookiesConfig)
    } else {
        delete axios.defaults.headers.common['x-auth-token']
        Cookies.remove("_scheduling_session", cookiesConfig)
    }
}

//token that passed to setAuthToken is not yet encrypted, so do this in

export default setAuthToken
