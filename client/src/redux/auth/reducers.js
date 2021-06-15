import {AUTH_ERROR, LOAD_USER, LOGOUT, SET_CURRENT_PROFILE, SET_CURRENT_USER} from "../actions"
import Cookies from "js-cookie"
import cookiesConfig from "../../helpers/cookiesConfig"

const initialState = {
    isLoggedIn: false,
    user: {},
    loading: false,
    firstLoggedIn: false
}

export const auth = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            }
        case LOAD_USER:
            return {
                ...state,
                loading: true
            }
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            }
        case AUTH_ERROR:
        case LOGOUT:
            Cookies.remove("_pos_session", cookiesConfig)  //remove token from cookies
            return {
                ...state,
                isLoggedIn: false,
                loading: false,
                user: {}
            }
        default:
            return state
    }
}