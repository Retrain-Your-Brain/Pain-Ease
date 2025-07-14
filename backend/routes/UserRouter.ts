const express=require('express')
const UserControl = require("../controllers/userController")


const userRouter=express.Router()
userRouter.post('/register',UserControl.register)
userRouter.post('/login',UserControl.login)

module.exports=userRouter