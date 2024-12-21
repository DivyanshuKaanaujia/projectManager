import mongoose  from "mongoose";

const projectSchema = mongoose.Schema({
    name:{type:String,min:2,required:true},
    description:{type:String,min:2,required:true},
    tasks:[{
            type:mongoose.Schema.type.ObjectId,
            ref:"Task"
    }]
})

const Project = mongoose.Model("Project",projectSchema)

module.exports = Project;