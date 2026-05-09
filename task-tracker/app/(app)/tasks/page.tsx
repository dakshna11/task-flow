import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";
import TaskList from "./TaskList";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function TasksPage() {
    await connectToDatabase();
    const session: any = await getCurrentUser();
    const tasks = await Task.find({userId: session?.id}).lean();

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