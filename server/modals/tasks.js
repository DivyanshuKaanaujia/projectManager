import mongoose  from "mongoose";

const taskSchema = mongoose.Schema({
    name:{type:String,min:2,required:true},
    completed:{type:Boolean}
})

const Task = mongoose.Model("Task",taskSchema)

module.exports = Task;