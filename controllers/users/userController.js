const Role = require("../../models/users/Role")
const User = require("../../models/users/User")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function hashPassword(password) {
  return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

module.exports = {

  index: async (req, res, next) => {
    try {
      const user = await User.find({})
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({
            error: "Email does not exist"
        })
      }

      const validPassword = await validatePassword(password, user.password)
      if (!validPassword) {
        return res.status(401).json({
            error: "Password is incorrect"
        })
      }

      const token = jwt.sign({ userID: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" })

      await User.findByIdAndUpdate(user._id, { token })

      const getRoleName = await Role.findById(user.role)

      res.status(200).json({
        user: { email: user.email, userId: user._id, role: getRoleName.roleName},
        token
      })
    } catch (err) {
        next(err)
    }
  },

  createUser: async(req, res, next) => {
    try {
      const newUser = new User(req.body)
      await hashPassword(newUser.password)
      await newUser.save();
      res.status(201).json(newUser)
    } catch (err) {
      next(err)
    }
  },

  updateUser: async(req, res, next) => {
    try {
      const { userID } = req.params
      const newUpdate = req.body
      const updatedUser = await User.findByIdAndUpdate(userID, newUpdate)
      updatedUser.save();
      res.status(201).json(updatedUser)
    } catch (err) {
      next(err);
    }
  },

  getOwnProfile: async(req, res, next) => {
    try {
      const curUser = res.locals.loggedInUser
      const getRoleName = await Role.findById(curUser.role)
      const payload = {
          userID: curUser._id,
          teacherID: curUser.teaccherID,
          firstName: curUser.firstName,
          lastName: curUser.lastName,
          username: curUser.username,
          email: curUser.email,
          phoneNumber: curUser.phoneNumber,
          role: getRoleName.roleName,
          department: curUser.department,
          subject: curUser.subject,
          freeTime: curUser.freeTime,
          createdAt: curUser.createdAt,
          updatedAt: curUser.updatedAt,
          token: curUser.token
      }
      res.status(200).json(payload)
    } catch (err) {
        next(err)
    }
  },

  updateOwnProfile: async(req, res, next) => {
    try {
      const curUser = res.locals.loggedInUser
      const newUser = req.body

      if (newUser.hasOwnProperty('password')) {
          const oldPassword =  newUser.password
          const validPassword = await validatePassword(oldPassword, curUser.password)
          if (!validPassword) return next(new Error('Old Password is incorrect'))

          const newPassword =  newUser.newpassword
          const hashedPassword = await hashPassword(newPassword)
          newUser.password = hashedPassword
          await User.findByIdAndUpdate(curUser, newUser, {new: true})
      } else {
          await User.findByIdAndUpdate(curUser, newUser, {new: true})
      }

      const user = await User.findById(curUser)
      res.status(200).json(user)
    } catch (err) {
        next(err)
    }
  },

}