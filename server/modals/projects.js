import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name: { type: String, minlength: 2, required: true },
    description: { type: String, minlength: 2, required: true },
    tasks: {
        type: [{
            name: { type: String, minlength: 2, required: true },
            completed: { type: Boolean, default: false }
        }],
        validate: {
            validator: function (tasks) {
                return tasks.length >= 1;
            },
            message: "A project must have at least one task."
        }
    }
});

export const Project = mongoose.model("Project", projectSchema);
