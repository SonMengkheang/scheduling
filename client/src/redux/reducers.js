import { combineReducers } from "redux"
import { auth } from "./auth/reducers"
import { settings } from "./setting/reducers"

const reducers = combineReducers({
    auth,
    // alert,
    settings,
})

export default reducers
