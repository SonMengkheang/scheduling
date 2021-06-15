import React, { Fragment, lazy, useEffect } from "react"
import { history } from "./helpers/history"
import jwtDecode from "jwt-decode"
import Cookies from "js-cookie"

import {Router, Route, Switch} from "react-router-dom"

import store  from "./redux/store"
import setAuthToken from "./helpers/setAuthToken"

import { setCurrentUser, setCurrentUserProfile} from "./redux/auth/actions"
import { decryptPayload } from "./helpers/cryptography"
import {LOGOUT} from "./redux/actions"
import { Role } from "./helpers/role"
import baseAPI from "./api/baseAPI";

const ViewAuthenticator = lazy(() => import("./views/auth"))
const ViewAdmin = lazy(() => import("./views/admin"))

const App = () => {

    // useEffect(() => {

    //     if(typeof Cookies.get("_pos_session") !== "undefined") {
    //         const token = decryptPayload(Cookies.get("_pos_session"))
    //         setAuthToken(token)
    //         const decoded = jwtDecode(token)

    //         //Set user and isLoggedIn
    //         store.dispatch(setCurrentUser(decoded))
    //         store.dispatch(setCurrentUserProfile())

    //         //checking  for expire token
    //         const currentTime = Date.now() / 1000 //to get Milliseconds
    //         if(decoded.exp < currentTime) {
    //             store.dispatch({ type: LOGOUT })
    //             baseAPI.delete(`/sells/parkSale/`)
    //             history.push("/people/user/login")
    //         }
    //     } else {
    //         history.push("/people/user/login")
    //     }

    // }, [Cookies.get("_pos_session")])

    return(
      <Fragment>
          <Router history={history}>
              <Switch>
                  <Route path="/login" render={ props => <ViewAuthenticator { ...props } />}/>
                  <Route path="/admin" render={ props => <ViewAdmin { ...props } />}/>
              </Switch>
          </Router>
      </Fragment>
    )
}

export default App
