if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
require("rootpath")();
    
const express = require("express");
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require("cookie-parser")
const nocache = require('nocache')
const bodyParser = require("body-parser");
const cors = require("cors");
const connectionDB = require("./config/database");
const config = require('config')

//Initialize App
const server = express();
//Connection to Database
connectionDB();
//Call routes
// const routeList  = require("./routes/routeList")
// routeList(server)
const faculties = require("./routes/subjects/facultyRoute")
const departments = require("./routes/subjects/departmentRoute")
const subjects = require("./routes/subjects/subjectRoute")
const generations = require("./routes/subjects/generationRoute")
const classes = require("./routes/classes/classRoute")
const users = require("./routes/users/userRoute")
const roles = require("./routes/users/roleRoute")

// middlewares
server.use(cors());
server.use(express.json());
server.use('/uploads', express.static('uploads'));
server.use(
    express.urlencoded({
        extended: false
    })
);
// server.use(cookieParser(process.env.SESSION_SECRET))

server.use("/faculties", faculties)
server.use("/departments", departments)
server.use("/subjects", subjects)
server.use("/generations", generations)
server.use("/classes", classes)
server.use("/users", users)
server.use("/roles", roles)

// Session
// server.use(session({
//     name: "xss__package",
//     secret: process.env.SESSION_SECRET,
//     store: new MongoDBStore({
//         uri: config.get("mongoURL"),
//         collection: "session",
//         expires: 1000 * 60 * 60 * 24 //1 day
//     }),
//     cookie: {
//         maxAge: parseInt(process.env.SESSION_MAX_AGE),
//         httpOnly: true,
//         secure: false,
//         sameSite: true
//     },
//     resave: true,
//     saveUninitialized: true,
// }))
// server.use(nocache())

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
// error handler function
server.use((err, req, res, next) => {
    const error = server.get("env") === "development" ? err : {};
    const status = err.status || 500;

    // Respond to client
    res.status(status).json({
        error: {
            message: error.message,
        },
    });

    // Respond to ourseleves
    console.log(err);
});


//Set Port
const PORT = process.env.PORT || 5000;
//const HOSTNAME = process.env.HOSTNAME;
const HOSTNAME = 'localhost';
server.listen(PORT, HOSTNAME, () => {
    console.log(`server start listing at http://${HOSTNAME}:${PORT}`);
});
