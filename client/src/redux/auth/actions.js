import jwt_decode from "jwt-decode"
import setAuthToken from "../../helpers/setAuthToken"
import baseAPI from "../../api/baseAPI"
import Cookies from "js-cookie"
import {encryptPayload} from "../../helpers/cryptography"
import {
    LOAD_USER,
    SET_CURRENT_USER,
    GET_ERRORS, 
    LOGOUT,
    SET_CURRENT_PROFILE,
} from "../actions"
import * as auth from '../../constants/variable.js'
import cookiesConfig from "../../helpers/cookiesConfig"

export const login = (email, password) => dispatch => {

    baseAPI
        .post(`http://${auth.domain_name}:${auth.port}/users`, JSON.stringify({ email, password }))
        .then(res => {
            const { token, user } = res.data
            Cookies.set("_pos_session", encryptPayload(token), cookiesConfig)
            setAuthToken(token)

            const decode = jwt_decode(token)
            //Set current user
            dispatch(setCurrentUser({
                ...decode,
                email: user.email,
                role: user.role,
                token: token
            }))
            //dispatch(onLoadCounter())
            dispatch(setUserLoading())
            dispatch(setCurrentUserProfile({
                ...decode,
                email: user.email,
                role: user.role,
                permission: user.permission,
                token: token
            }))
        })
        .catch(err => {
            //if login error, print error message
            dispatch({type: GET_ERRORS,})
        })

}

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//user Loading
export const setUserLoading = () => {
    return {
        type: LOAD_USER
    }
}

export const setCurrentUserProfile = () => dispatch => {
    baseAPI
        .get(`http://${auth.domain_name}:${auth.port}/users/profile`)
        .then(res => {
            dispatch({
                type: SET_CURRENT_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response && err.response.data
            })
        })
}

//logout user
export const logoutUser = () => dispatch => {
    dispatch({ type: LOGOUT })
    dispatch(setCurrentUser({}))
}


