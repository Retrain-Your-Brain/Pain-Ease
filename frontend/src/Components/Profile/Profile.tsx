import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { DescriptionAlerts } from "../Alert/AlertMessage";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { registerApi } from "../../user";

import { useSelector } from "react-redux";
import { useAppSelector } from "../../store/store";
import Private from "../Navbar/PrivateNavbar";

// const validationSchema= Yup.object({
//     username:Yup.string().required("Username is required"),
//     email:Yup.string().email("Invalid email address").required("Email is required"),
//     password: Yup.string().min(8,"Password must be atleast 8 characters long").required("Password is required"),
//     confirmPassword:Yup.string().oneOf([Yup.ref("password")],"Password must match").required("Confirming your password is required"),
// })

export default function Profile() {
    const user = useAppSelector((state)=> state.user.user);
    // const formik=useFormik({
    //     initialValues:{
    //         email:"",
    //         password:"",
    //         username:"",
    //         confirmPassword:"", // Added confirmPassword to match the validation schema
    //     },
    //     validationSchema,
    //     onSubmit:handleClick
    //     }
    // )
    return (
<div>
        <Private/>
{/*  two sections */}
<div>
<div className="mt-50" >

            <div>
            <h1 className="font-semibold text-black-800  text-2xl"> Account Info</h1>
            <input
            type="text"
            defaultValue={user}
            placeholder="username"
            className="border-neutral-300 rounded border mr-50 h-10 mt-8 w-full pl-1 text-center"
            >
            </input>
            
            </div>
            <div>
           
            <input
            type="email"
            defaultValue={user}
            placeholder=" Email" 
            className="border-neutral-300 rounded border mr-50 h-10 mt-8 w-full text-center pl-1"
            >
            </input>
            </div>
            
        


            </div>

      <div className="mt-30 max-w-md mx-auto h-auto bg-white p-6 rounded-xl shadow-lg  border border-gray-200">
        
        
        <form >
            <div>
            <div>
            <h1 className="font-semibold text-black-800  text-2xl"> Update Profile</h1>
            <input
            type="username"
            placeholder="  Username" 
            className="border-neutral-300 rounded border mr-50 h-10 mt-8 w-full pl-1"
            >
            </input>
            
            </div>
            <div>
          
            <input
            type="email"
            placeholder=" Email" 
            className="border-neutral-300 rounded border mr-50 h-10 mt-8 w-full pl-1"
            >
            </input>
            </div>
            
        
        <button className="text-center text-white font-bold rounded mt-8   h-10 w-full bg-gradient-to-tr from-blue-500 to-teal-500 opacity-200  ">
            Save Changes
        </button>

            </div>
        </form>
      </div>

      <div className="mt-15  max-w-md mx-auto">
        <h1 className="font-semibold text-black-800 ">Change Your Password</h1>
        <div className="gap-y-2">
            <h1 className="text-black-800  mr-73 mt-8"> New Password</h1>
            <input
            type="password"
            placeholder=" Enter new Password" 
            className="border-neutral-300 rounded border w-100 h-10  mt-3   pl-1"
            >
            </input>
            
           

             
        <button className="text-center text-white font-bold rounded mt-8   h-10 w-100 bg-blue-500 ">
            Update new password
        </button>
        </div>
      </div>
      </div>
      </div>
)}
