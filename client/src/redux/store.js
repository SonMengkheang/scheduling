import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import rootReducers from "./reducers"
import setAuthToken from "../helpers/setAuthToken"

const initialState = {}
const middleware = [thunkMiddleware]

const loggerMiddleware = createLogger()
const store = createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware, loggerMiddleware)),
)
let currentState = store.getState()

store.subscribe(() => {

    // keep track of the previous and current state to compare changes
    let previousState = currentState
    currentState = store.getState()

    // if the token changes set the value in localStorage and Axios headers
    if(previousState.auth.token !== currentState.auth.token) {
        const token = currentState.auth.token
        setAuthToken(token)
    }
})

export default store
