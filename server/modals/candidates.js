import mongoose  from "mongoose";

const candidateSchema = mongoose.Schema({
    name:{type:String,min:2,required:true}
})

const Candidate = mongoose.Model("Candidate",candidateSchema)

module.exports = Candidate;