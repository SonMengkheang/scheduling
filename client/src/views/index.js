import React from "react";
import { Redirect } from "react-router-dom"

//opening the first time will redirect to login page
const Main = () => {
    return <Redirect to="/login" />
}

export default Main