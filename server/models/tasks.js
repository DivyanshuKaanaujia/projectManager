import mongoose  from "mongoose";

const taskSchema = mongoose.Schema({
    name:{type:String,min:2,required:true},
    completed:{type:Boolean}
})

export const Task = mongoose.model("Task",taskSchema)
