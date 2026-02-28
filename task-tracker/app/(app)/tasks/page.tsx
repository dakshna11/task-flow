import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";
import TaskList from "./TaskList";

export default async function TasksPage() {
    await connectToDatabase();
    const tasks = await Task.find().lean();

    const serializedTasks = tasks.map(task => ({
        ...task,
        _id: task._id.toString(),
        createdAt: task.createdAt.toISOString(),
        updatedAt: task.updatedAt.toISOString(),
    }));

    return (
        <div>
            <h2>All Tasks</h2>
            <TaskList tasks={serializedTasks} />
        </div>
    )
}