import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom"
import UserLayout from '../../layouts/UserLayout'

export const Classes = lazy(() => import("./classes/Classes"))
export const Schedule = lazy(() => import("./schedule/Schedule"))
export const Profile = lazy(() => import("./profile/Profile"))
export const Time = lazy(() => import("./time/Time"))
export const TimeEdit = lazy(() => import("./time/TimeEdit"))

const UserIndex = () => {

    const { url } = useRouteMatch()

    return (
        <UserLayout>
            <div className="dashboard-wrapper">
                <Suspense fallback={ <div className="loading" /> }>
                    <Switch>
                        <Redirect exact from={`${url}/`} to={`${url}/schedule`} />

                        <Route exact path={`${url}/schedule`} render={props => <Schedule {...props} />} />
                        <Route exact path={`${url}/class`} render={props => <Classes {...props} />} />
                        <Route exact path={`${url}/time`} render={props => <Time {...props} />} />
                        <Route path={`${url}/time/edit`} render={props => <TimeEdit {...props} />} />
                        <Route exact path={`${url}/profile`} render={props => <Profile {...props} />} />

                        <Redirect to="/error" />
                    </Switch>
                </Suspense>
            </div>
        </UserLayout>
    )
}

export default UserIndex
