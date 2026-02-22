import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function GET() {
  try {
    await connectToDatabase();
    const tasks = await Task.find({});
    return NextResponse.json(tasks);
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
            description: body.description,
            assignee: body.assignee,
            priority: body.priority,
            createdBy: 'admin'
        });
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json({ message: "Failed to create task" }, { status: 500 });
    }
}