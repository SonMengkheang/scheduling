import React, { lazy, Suspense } from "react"
import { Route, Switch, Redirect,useRouteMatch } from "react-router-dom"
import AdminLayout from "../../layouts/AdminLayout"

export const Faculty = lazy(() => import("../admin/faculty/Faculty"))
export const CreateFaculty = lazy(() => import("../admin/faculty/CreateFaculty"))

export const Department = lazy(() => import("../admin/department/Department"))
export const Subject = lazy(() => import("../admin/subject/Subject"))
export const Year = lazy(() => import("../admin/year/Year"))
export const Schedule = lazy(() => import("../admin/schedule/Schedule"))
export const User = lazy(() => import("../admin/user/User"))


const AdminIndex = () => {

    const { url } = useRouteMatch()

    return(
        <AdminLayout>
            <div className="dashboard-wrapper">
                <Suspense fallback={ <div className="loading" /> }>
                    <Switch>
                        <Redirect exact from={`${url}/`}  to={`${url}/faculty`}/>

                        <Route exact path={`${url}/faculty`} render={props => <Faculty {...props} />} />
                        <Route path={`${url}/faculty/create`} render={props => <CreateFaculty {...props} />} />

                        <Route path={`${url}/department`} render={props => <Department {...props} />} />
                        <Route path={`${url}/subject`} render={props => <Subject {...props} />} />
                        <Route path={`${url}/year`} render={props => <Year {...props} />} />
                        <Route path={`${url}/schedule`} render={props => <Schedule {...props} />} />
                        <Route path={`${url}/user`} render={props => <User {...props} />} />

                        <Redirect to="/error" />
                    </Switch>
                </Suspense>
            </div>
        </AdminLayout>
    )
}

export default AdminIndex