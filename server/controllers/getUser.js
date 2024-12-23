import {Candidate} from "../models/candidates.js"
import { CandToProj } from "../models/candidateToProject.js";

export const getUser = async(req,res)=>{
    const {name} = req.body;
    try {
        let isInDb = await Candidate.findOne({name:name});
        if(!isInDb){
            isInDb = await Candidate.create({name:name})
        }
        res.status(200).json({isInDb})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error in doing mongoose operations in getUser"})
    }
    
}

export const myProjects = async(req,res)=>{
    const {name} = req.body;
    console.log("name: ",name)
    try {
        const candidate = await Candidate.findOne({name:name});
        console.log(candidate)
        const allProj = await CandToProj.findOne({candidate:candidate._id})
        res.status(200).json({allProj});
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Error while fetching assigned projects"})
    }
}