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
