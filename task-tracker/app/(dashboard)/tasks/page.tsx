import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";
import TaskList from "./TaskList";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { serializeDocuments } from "@/lib/serialize";

export default async function TasksPage() {
    await connectToDatabase();
    const session: any = await getCurrentUser();
    const tasks = await Task.find({userId: session?.id});

    const serializedTasks = serializeDocuments(tasks);

    return (
        <div>
            <h2>All Tasks</h2>
            <TaskList tasks={serializedTasks} />
        </div>
    )
}