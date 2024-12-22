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
        let candidate = await Candidate.findOne({name});
        let proj = await Project.findOne({_id:id});
        let cToP = await CandToProj.findOne({candidate:candidate._id});
        if(!cToP){
            cToP = await CandToProj.create({candidate:candidate._id,project:[{
                _id:proj._id,
                name:proj.name,
                description:proj.description,
                tasks:proj.tasks
            }]})
        }else{
            const isAlreadyAccepted = cToP.project.some(p => p._id.equals(proj._id));
            if (isAlreadyAccepted) {
                return res.status(400).json({ error: "Project already accepted" });
            }

            cToP.project.push({
                _id: proj._id,
                name: proj.name,
                description: proj.description,
                tasks: proj.tasks
            });
            await cToP.save();
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

export const updateTask = async(req,res)=>{
    const {name,projectId,taskId,status} = req.body;
    if(!projectId || !taskId){
        res.status(400).json({error:"ProjectId and TaskId both required"});
    }
    try {
        const candidate = await Candidate.findOne({name:name})
        let cToP = await CandToProj.findOne({candidate:candidate._id});
        for(let i=0;i<cToP.project.length;i++){
            if(cToP.project[i]._id == projectId){
                for(let j=0;j<cToP.project[i].tasks.length;j++){
                    if(cToP.project[i].tasks[j]._id == taskId){
                        cToP.project[i].tasks[j].completed = status;
                        await cToP.save();
                        return res.status(200).json({cToP});
                    }
                }
            }
        }
        res.status(200).json({message:"No task and project Id found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Error while updating the task"})
    }
}