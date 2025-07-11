import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


const validationSchema= Yup.object({
    username:Yup.string().required("Username is required"),
    email:Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8,"Password must be atleast 8 characters long").required("Password is required"),
    confirmPassword:Yup.string().oneOf([Yup.ref("password")],"Password must match").required("Confirming your password is required"),
})

export default function Register(): any {
    const navigate=useNavigate()
    const formik=useFormik({
        initialValues:{
            email:"",
            password:"",
            username:"",
        },
        validationSchema,
        onSubmit:(values)=>{
            
        }
    })
}
