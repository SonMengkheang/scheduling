import React, { Fragment, lazy, useEffect } from "react"
import { history } from "./helpers/history"
import jwtDecode from "jwt-decode"
import Cookies from "js-cookie"

import { Router, Route, Switch } from "react-router-dom"

import store  from "./redux/store"
import setAuthToken from "./helpers/setAuthToken"

import { setCurrentUser, setCurrentUserProfile} from "./redux/auth/actions"
import { decryptPayload } from "./helpers/cryptography"
import { LOGOUT } from "./redux/actions"
import { Role } from "./helpers/role"
import baseAPI from "./api/baseAPI";
import { PrivateRoute } from "./routes/PrivateRoute"

const ViewMain = lazy(() => import("./views"))
const ViewAuthenticator = lazy(() => import("./views/auth"))
const ViewAdmin = lazy(() => import("./views/admin"))
const ViewUser = lazy(() => import("./views/user"))

const App = () => {

    console.log("Cookie: ", Cookies.get("_scheduling_session"))

    useEffect(() => {

        // if(Cookies.get("_scheduling_session") === undefined) {
        //     history.go(0)
        // }

        if(typeof Cookies.get("_scheduling_session") !== "undefined") {
            const token = decryptPayload(Cookies.get("_scheduling_session"))
            setAuthToken(token)
            const decoded = jwtDecode(token)

            //Set user and isLoggedIn
            store.dispatch(setCurrentUser(decoded))
            store.dispatch(setCurrentUserProfile())

            //checking  for expire token
            const currentTime = Date.now() / 1000 //to get Milliseconds
            if(decoded.exp < currentTime) {
                store.dispatch({ type: LOGOUT })
                history.push("/login")
            }
        } else {
            history.push("/login")
        }

    }, [Cookies.get("_scheduling_session")])

    return(
        <Fragment>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" render={ props => <ViewMain /> } />
                    <Route path="/login" render={ props => <ViewAuthenticator { ...props } />}/>
                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={ ViewAdmin } />
                    <PrivateRoute path="/user" roles={[Role.Lecturer]} component={ ViewUser } />
                    {/* <Route path="/admin" render={ props => <ViewAdmin { ...props } />}/> */}
                </Switch>
            </Router>
      </Fragment>
    )
}

export default App
