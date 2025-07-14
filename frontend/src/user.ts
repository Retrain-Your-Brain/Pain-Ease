import axios from 'axios';

export const data = async({ prompt }: { prompt: string })=>{
    const response= await axios.post('http://localhost:5000/prompt',{
        prompt,
    })
    
    return response.data;
}
export const registerApi= async({username,email,password}:{username:string,email:string,password:string})=>{
    const response=await axios.post('http://localhost:5000/register',{
        username,email,password
    })
    return response.data
}

export const LoginAPI= async({email,password}:{email:string,password:string})=>{{
    const response= await axios.post('http://localhost:5000/login',{
        email,password
    })
    
    // localStorage.setItem("token", token);
    // localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data

}}