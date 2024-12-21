import {Candidate} from "../modals/candidates.js"

export const getUser = async(req,res)=>{
    const {name} = req.body;
    try {
        let isInDb = await Candidate.findOne({name:name});
        if(!isInDb){
            isInDb = await Candidate.create({name:name})
        }
        res.send({isInDb})
    } catch (error) {
        console.log("Error in doing mongoose operations in getUser: ", error)
    }
    
}