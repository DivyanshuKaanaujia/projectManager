import mongoose  from "mongoose";

const cToPSchema = mongoose.Schema({
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Candidate"
    },
    project: [{
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        tasks: [{
            name: { type: String, required: true },
            completed: { type: Boolean, default: false }
        }]
    }]
})

export const CandToProj = mongoose.model("CandToProj",cToPSchema)