const jwt=require("jsonwebtoken")
const isAuthenticated=async(req,res,next)=>{
    const headerObj= req.headers
    const token= headerObj.authorization.split(' ')[1]
    console.log(token)
    const verifyToken= jwt.verify(token,"navu",(err,decoded)=>{
        if(err){
            return false
        }else{
            return decoded
        }
    })

    if(verifyToken){
        req.user=verifyToken.id // saving user
        next()
    }
    else{
        const err=new Error("Not authorized, no token provided")
        next(err)
    }
}
module.exports=isAuthenticated