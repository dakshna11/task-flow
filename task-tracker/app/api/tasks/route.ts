import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { serializeDocuments } from "@/lib/serialize";

export async function GET() {
  const session: any = await getCurrentUser();
  try {
    await connectToDatabase();
    const tasks = await Task.find({userId: session?.id,});
    return NextResponse.json(serializeDocuments(tasks));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const body = await request.json();
        const newTask = await Task.create({
            title: body.title,
            userId: body.userId,
            description: body.description,
            tag: body.tag,
            status: body.status,
            priority: body.priority,
            createdBy: 'admin'
        });
        return NextResponse.json(serializeDocuments([newTask])[0], { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ message: "Failed to create task" }, { status: 500 });
    }
}