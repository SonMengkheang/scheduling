import React from "react"
import { useSelector } from "react-redux"
import { Route, Redirect } from "react-router-dom"

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {

    const currentUser = useSelector(state => state.auth)

    return(
        <Route { ...rest } render ={ props => {
            if(currentUser.user.role !== undefined) {
                //checking if route restricted by role
                if(roles && roles.indexOf(currentUser.user.role) === -1) {
                    return <Redirect to={{ pathname: "/error" }}  />
                }
            }
            // authorised so return component
            return <Component {...props} />
        }} />
    )
}


