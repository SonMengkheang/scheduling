if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
require("rootpath")();

const express = require("express");
const session = require("express-session")
const connectionDB = require("./config/database");
const fs = require("fs");
const colors = require("colors")
const bcrypt = require('bcrypt')

//Initialize App

//Connection to Database
connectionDB();

// load models
const User = require("./models/users/User");
const Role = require("./models/users/Role");



// Read joson files

const user = JSON.parse(fs.readFileSync(`${__dirname}/seeds/usersData.json`, 'utf8'))
const role = JSON.parse(fs.readFileSync(`${__dirname}/seeds/rolesData.json`, 'utf8'))
// console.log("User : ",user);

// hash password 
async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

// console.log("hashedPassword : ", hashedPassword);
// user.password = hashedPassword;
// console.log("User : ",user);

// import and delete user Data 
const importUser = async() => {
    try {
        for( let i=0 ; i<user.length ; i++ ){
            const hashedPassword = await hashPassword(user[i].password);
            user.password = hashedPassword;
            await User.create(user);
            console.log(`User Data has sucessfully imported`.green.inverse);
            process.exit()
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async() => {
    try {
        await User.deleteMany();
        console.log(`User Data has sucessfully deleted`.red.inverse);
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

// import and delete Role Data 
const importRole = async() => {
    try {
        await Role.create(role);
        console.log(`Role Data has sucessfully imported`.green.inverse);
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

const deleteRole = async() => {
    try {
        await Role.deleteMany();
        console.log(`Role Data has sucessfully deleted`.red.inverse);
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

//  run command to import or delete 
if (process.argv[2] === "-i"){
    importRole().then();
    importUser().then();
} else if (process.argv[2] === "-d"){
    deleteRole().then();
    deleteUser().then();
}
