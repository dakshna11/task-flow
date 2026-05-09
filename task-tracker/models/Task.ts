import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    assignee: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['todo', 'inprogress', 'done'],
        default: 'todo'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    comments: [commentSchema],
    createdBy: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', taskSchema);