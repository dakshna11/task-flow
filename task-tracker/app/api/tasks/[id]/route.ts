import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const {id} = await context.params;
    //const user = await getcurre

    const updatedData: any = {};

    if(body.status) {
        updatedData.status = body.status;
    }

    const userRole = "admin"; // This should come from your auth context/session

    if(body.assignee && userRole === "admin") {
        updatedData.assignee = body.assignee;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}