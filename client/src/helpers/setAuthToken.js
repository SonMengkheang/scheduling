import baseAPI from "../api/baseAPI"
import Cookies from "js-cookie"
import { encryptPayload } from "./cryptography"
import cookiesConfig from "./cookiesConfig"

const setAuthToken = token => {
    if (token) {
        baseAPI.defaults.headers.common['x-auth-token'] = token
        Cookies.set('_pos_session', encryptPayload(token), cookiesConfig)
    } else {
        delete baseAPI.defaults.headers.common['x-auth-token']
        Cookies.remove("_pos_session", cookiesConfig)
    }
}

//token that passed to setAuthToken is not yet encrypted, so do this in

export default setAuthToken
