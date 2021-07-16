import React, { lazy, Suspense } from "react"
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom"
import AdminLayout from "../../layouts/AdminLayout"

export const Faculty = lazy(() => import("./faculty/Faculty"))
export const CreateFaculty = lazy(() => import("./faculty/CreateFaculty"))
export const EditFaculty = lazy(() => import("./faculty/EditFaculty"))

export const Department = lazy(() => import("./department/Department"))
export const CreateDepartment = lazy(() => import("./department/CreateDepartment"))
export const EditDepartment = lazy(() => import("./department/EditDepartment"))

export const Subject = lazy(() => import("./subject/Subject"))
export const CreateSubject = lazy(() => import("./subject/CreateSubject"))
export const EditSubject = lazy(() => import("./subject/EditSubject"))

export const Generation = lazy(() => import("./generation/Generation"))
export const CreateGeneration = lazy(() => import("./generation/CreateGeneration"))
export const EditGeneration = lazy(() => import("./generation/EditGeneration"))

export const Classes = lazy(() => import("./classes/Classes"))
export const CreateClasses = lazy(() => import("./classes/CreateClasses"))
export const EditClasses = lazy(() => import("./classes/EditClasses"))

export const Schedule = lazy(() => import("./schedule/Schedule"))
export const GenerateSchedule = lazy(() => import("./schedule/GenerateSchedule"))
export const EditSchedule = lazy(() => import("./schedule/EditSchedule"))
export const ViewSchedule = lazy(() => import("./schedule/ViewSchedule"))

export const User = lazy(() => import("./user/User"))
export const CreateUser = lazy(() => import("./user/CreateUser"))
export const EditUser = lazy(() => import("./user/EditUser"))

export const General = lazy(() => import("./setting/general/General"))
export const Role = lazy(() => import("./setting/role/Role"))
export const Profile = lazy(() => import("./setting/profile/Profile"))


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
                        <Route path={`${url}/schedule/generate`} render={props => <GenerateSchedule {...props} />} />
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