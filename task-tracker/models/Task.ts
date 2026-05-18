import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    assignee: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['pending', 'inprogress', 'done'],
        default: 'pending'
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
    tag: {
        type: String,
        enum: ['work', 'personal', 'urgent'],
        default: 'personal'
    },
    comments: [commentSchema],
    createdBy: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', taskSchema);