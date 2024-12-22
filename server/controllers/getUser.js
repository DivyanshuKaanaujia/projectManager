import {Candidate} from "../modals/candidates.js"
import { CandToProj } from "../modals/candidateToProject.js";

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

export const myProjects = async(req,res)=>{
    const {name} = req.body;
    try {
        const candidate = await Candidate.findOne({name});
        const allProj = await CandToProj.findOne({candidate:candidate._id})
        res.status(200).json({allProj});
    } catch (error) {
        res.status(500).json({error:"Error while fetching assigned projects"})
    }
}