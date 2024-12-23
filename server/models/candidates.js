import mongoose  from "mongoose";

const candidateSchema = mongoose.Schema({
    name:{type:String,min:2,required:true}
})

export const Candidate = mongoose.model("Candidate",candidateSchema)

// module.exports = Candidate;