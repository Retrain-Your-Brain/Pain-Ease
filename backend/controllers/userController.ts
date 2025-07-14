
import { Request, Response } from "express";
import User from "../model/user";
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken"); 

const UserControl={
    register:async(req:Request,res:Response)=>{
        try{
        const {username,email,password}=req.body as {username:string, email:string, password:string}
        if (!username||!email||!password){
            throw new Error("all fields are required")
        }
        const userExists=await User.findOne({email})
        if(userExists){
            throw new Error("User already exists")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword=  await bcrypt.hash(password,salt)
        const userCreated= await User.create({
            username,
            email,
            password:hashedPassword,
        })
        if (!userCreated) {
            throw new Error("User creation failed");
        }

        res.json({
            _id:userCreated._id,
            username: userCreated.username,
            password:userCreated.password,
        })}
        catch(error:any){
            console.error("Register error:", error);
        res.status(500).json({message: error.message ||"Internal server error" });
        }
    },

    login:async(req:Request,res:Response)=>{
        const{email,password}= req.body
        const user= await User.findOne({email})
        if(!user){
            throw new Error("invalid login credentials")
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new Error("invalid password")
        }
        const token= jwt.sign({id:user._id},"navu",{
            expiresIn:"150y",
        })
        console.log(token)
        res.json({
            message:"login successful",
            _id:user._id,
            token,
            user,
        })
    },
    changePassword:async(req:Request,res:Response)=>{
        const {newPassword,username}= req.body
        const user= await User.findOne({username})
        if(!user){
            throw new Error("user not found")
        }
        const salt= bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(newPassword,salt)
    },
    
    updateUserProfile: async (req:Request, res:Response) => { // register function 
    
        const {email,username} = req.body; // Find user by ID from request
        const updatedUser= await User.findByIdAndUpdate(
            {email,username}, // Update email and username
            {new:true} // Return the updated user
        );
        res.json({ message:"Profile updated successfully", updatedUser })
    }

}
module.exports= UserControl
