import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Not Yet',
        enum: ["Not Yet", "Reading", "Completed"],
    },
    name: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export default mongoose.model('tasks', taskSchema)
