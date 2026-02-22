import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";

export default async function TasksPage() {
    await connectToDatabase();
    const tasks = await Task.find().lean();
    return (
        <div>
            <h2>All Tasks</h2>
            {tasks.length === 0 ? <p>No tasks created</p> : null}
            {tasks.map(task => (
                <div key={task._id}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Assignee: {task.assignee}</p>
                    <p>Priority: {task.priority}</p>
                </div>
            ))}
        </div>
    )
}