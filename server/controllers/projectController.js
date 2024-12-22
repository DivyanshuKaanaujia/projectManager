import { Candidate } from "../modals/candidates.js";
import { CandToProj } from "../modals/candidateToProject.js";
import { Project } from "../modals/projects.js";

export const addProject = async (req, res) => {
    const { name, description, tasks } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: "One of the required fields is missing" });
    }

    try {
        const project = await Project.create({ name, description, tasks });
        res.status(200).json(project);
    } catch (error) {
        console.error("Error occurred during project addition:", error);
        res.status(500).json({ error: "Internal Server Error. Could not add project." });
    }
};

export const acceptProject = async(req,res)=>{
    const {name,id} = req.body;
    if(!name || !id){
        return res.status(400).json({error:"One of the required fields is missing"})
    }
    try{
        let candidate = await Candidate.findOne({name})._id;
        let cToP = await CandToProj.findOne({candidate});
        if(!cToP){
            cToP = await CandToProj.create({candidate:candidate,project:[id]})
        }else{
            if(cToP.project.includes(id)){
                return res.status(400).json({error:"Already Accepted"})
            }
            cToP = await CandToProj.findOneAndUpdate(
                {candidate},
                {$addToSet:{project:[id]}},
                {new:true,upsert:true})
        }
        res.status(200).json({cToP})
    }catch(error){
        console.error("Error occurred during project acceptance:", error);
        res.status(500).json({ error: "Internal Server Error. Could not accept project." });
    }
}

export const getAllProjects = async(req,res)=>{
    try {
        const allProjects = await Project.find();
        res.status(200).json({allProjects})
    } catch (error) {
        res.status(500).json({error:"Failed to get all projects"})
    }
}