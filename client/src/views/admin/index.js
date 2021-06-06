import React, { lazy, Suspense } from "react"
import { Route, Switch, Redirect,useRouteMatch } from "react-router-dom"
import AdminLayout from "../../layouts/AdminLayout"

export const Faculty = lazy(() => import("../admin/faculty/Faculty"))
export const CreateFaculty = lazy(() => import("../admin/faculty/CreateFaculty"))
export const EditFaculty = lazy(() => import("../admin/faculty/EditFaculty"))

export const Department = lazy(() => import("../admin/department/Department"))
export const CreateDepartment = lazy(() => import("../admin/department/CreateDepartment"))
export const EditDepartment = lazy(() => import("../admin/department/EditDepartment"))

export const Subject = lazy(() => import("../admin/subject/Subject"))
export const CreateSubject = lazy(() => import("../admin/subject/CreateSubject"))
export const EditSubject = lazy(() => import("../admin/subject/EditSubject"))

export const Generation = lazy(() => import("./generation/Generation"))
export const CreateGeneration = lazy(() => import("./generation/CreateGeneration"))
export const EditGeneration = lazy(() => import("./generation/EditGeneration"))

export const Classes = lazy(() => import("./classes/Classes"))
export const CreateClasses = lazy(() => import("./classes/CreateClasses"))
export const EditClasses = lazy(() => import("./classes/EditClasses"))

export const Schedule = lazy(() => import("../admin/schedule/Schedule"))
export const CreateSchedule = lazy(() => import("../admin/schedule/CreateSchedule"))
export const EditSchedule = lazy(() => import("../admin/schedule/EditSchedule"))
export const ViewSchedule = lazy(() => import("../admin/schedule/ViewSchedule"))

export const User = lazy(() => import("../admin/user/User"))
export const CreateUser = lazy(() => import("../admin/user/CreateUser"))
export const EditUser = lazy(() => import("../admin/user/EditUser"))

export const General = lazy(() => import("../admin/setting/general/General"))
export const Role = lazy(() => import("../admin/setting/role/Role"))
export const Profile = lazy(() => import("../admin/setting/profile/Profile"))


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
                        <Route path={`${url}/faculty/edit`} render={props => <EditFaculty {...props} />} />

                        <Route exact path={`${url}/department`} render={props => <Department {...props} />} />
                        <Route path={`${url}/department/create`} render={props => <CreateDepartment {...props} />} />
                        <Route path={`${url}/department/edit`} render={props => <EditDepartment {...props} />} />

                        <Route exact path={`${url}/subject`} render={props => <Subject {...props} />} />
                        <Route path={`${url}/subject/create`} render={props => <CreateSubject {...props} />} />
                        <Route path={`${url}/subject/edit`} render={props => <EditSubject {...props} />} />

                        <Route exact path={`${url}/generation`} render={props => <Generation {...props} />} />
                        <Route path={`${url}/generation/create`} render={props => <CreateGeneration {...props} />} />
                        <Route path={`${url}/generation/edit`} render={props => <EditGeneration {...props} />} />

                        <Route exact path={`${url}/class`} render={props => <Classes {...props} />} />
                        <Route path={`${url}/class/create`} render={props => <CreateClasses {...props} />} />
                        <Route path={`${url}/class/edit`} render={props => <EditClasses {...props} />} />

                        <Route exact path={`${url}/schedule`} render={props => <Schedule {...props} />} />
                        <Route path={`${url}/schedule/create`} render={props => <CreateSchedule {...props} />} />
                        <Route path={`${url}/schedule/edit`} render={props => <EditSchedule {...props} />} />
                        <Route path={`${url}/schedule/view`} render={props => <ViewSchedule {...props} />} />

                        <Route exact path={`${url}/user`} render={props => <User {...props} />} />
                        <Route path={`${url}/user/create`} render={props => <CreateUser {...props} />} />
                        <Route path={`${url}/user/edit`} render={props => <EditUser {...props} />} />

                        <Route path={`${url}/setting/general`} render={props => <General {...props} />} />

                        <Route path={`${url}/setting/role`} render={props => <Role {...props} />} />

                        <Route path={`${url}/setting/profile`} render={props => <Profile {...props} />} />

                        <Redirect to="/error" />
                    </Switch>
                </Suspense>
            </div>
        </AdminLayout>
    )
}

export default AdminIndex