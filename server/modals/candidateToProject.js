import mongoose  from "mongoose";

const cToPSchema = mongoose.Schema({
    candidate:{
        type:mongoose.Schema.type.ObjectId,
        ref:"Candidate"
    },
    project:[{
        type:mongoose.Schema.type.ObjectId,
        ref:"Project"
    }]
})

const CandToProj = mongoose.Model("CandToProj",cToPSchema)

module.exports = CandToProj;