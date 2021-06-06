import React, { lazy, Suspense } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import AuthenticationLayout from "../../layouts/AuthenticationLayout"

const AdminLoginPage = lazy(() => import("./AdminLoginPage"))

const PeopleIndex = ({ match }) => {

    const role = "user"

    return (
        <AuthenticationLayout>
            <Suspense fallback={<div className="loading"/>}>
                <Switch>
                    {/* <Redirect exact from={`${match.url}/` } to={`${match.url}/${role}/login`} /> */}

                    <Route path={`${match.url}/`} render={props => <AdminLoginPage {...props} />}/>

                    <Redirect to="/error" />
                </Switch>
            </Suspense>
        </AuthenticationLayout>
    );
};

export default PeopleIndex