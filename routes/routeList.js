const users = require("../routes/users/userRoute")
const roles = require("../routes/users/userRoute")
const departments = require("../routes/subjects/departmentRoute")
const faculties = require("../routes/subjects/facultyRoute")
const generations = require("../routes/subjects/generationRoute")
const subjects = require("../routes/subjects/subjectRoute")
const classes = require("../routes/classes/classRoute")


const routeList = (server) => {
    server.use("/users", users)
    server.use("/roles", roles)
    server.use("/departments", departments)
    server.use("/faculties", faculties)
    server.use("/generations", generations)
    server.use("/subjects", subjects)
    server.use("/classes", classes)
}

module.exports = routeList
