import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/Task";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { serializeDocument } from "@/lib/serialize";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  type CurrentUser = {
    role?: string;
    email?: string | null;
    name?: string | null;
    id?: string;
  };

  try {
    await connectToDatabase();
    const body = await request.json();
    const {id} = await context.params;
    const user = await getCurrentUser() as CurrentUser;
    console.log("Current user:", user);

    if(body.assignedTo && user.role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updatedData: any = {};

    if(body.status) {
        updatedData.status = body.status;
    }

    const userRole = user.role; // This should come from your auth context/session

    if(body.assignee && userRole === "admin") {
        updatedData.assignee = body.assignee;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    return NextResponse.json(serializeDocument(updatedTask));
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const {id} = await context.params;

    const task = await Task.findOneAndDelete({
      _id: id,
    });

    if (!task) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}