import mongoose from "mongoose"


const ReplySchema= new mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:"Post",required:true},
    content:{type:String,required:true},
    image:{type:String},
    createdAt:{type:Date,default:Date.now}
})

const Reply = mongoose.model("Reply", ReplySchema);
export default Reply;

