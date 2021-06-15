import axios from "axios"
import Cookies from "js-cookie"
import { decryptPayload } from "../helpers/cryptography"
import { domain_name, port } from "../constants/variable.js"

const baseApi = axios.create({
    baseURL: `http://${domain_name}:${port}`,
    headers: {
        "x-auth-token": Cookies.get("_scheduling_session") === undefined ? "" : decryptPayload(Cookies.get("_scheduling_session")),
        "Content-Type": 'application/json'
    }
})

export default baseApi
    