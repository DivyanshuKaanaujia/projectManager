import mongoose  from "mongoose";

const cToPSchema = mongoose.Schema({
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Candidate"
    },
    project:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    }]
})

export const CandToProj = mongoose.model("CandToProj",cToPSchema)