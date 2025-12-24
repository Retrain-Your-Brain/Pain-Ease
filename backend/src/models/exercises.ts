import Exercise from "./exercise";
import User from "./user"
const mongoose= require('mongoose')

const ExersSchema= new mongoose.Schema({
     user:{type:mongoose.Schema.Types.ObjectId, ref:User},
     exercises:[Exercise],
},{
    timestamps:true,
})

const Exercises= mongoose.model("Exercises",ExersSchema)
export default Exercises;
