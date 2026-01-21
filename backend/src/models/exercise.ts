import User from "./user"
const mongoose= require('mongoose')

const exerSchema= new mongoose.Schema({

    exerciseName:{type:String,required:true},
    youtubeLink: {type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId, ref:User},
    instructions:{type:String,required:true},
    frequency:{type:String,required:true},
},{
    timestamps:true,
})


const Exercise= mongoose.model("Exercise",exerSchema)

export default Exercise;


