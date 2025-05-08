// file: /src/app/tasks/[id]/route.ts
import { deleteTask, getTask, updateTask } from "@/lib/tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const task = getTask(id);
  if (task) {
    return NextResponse.json(task);
  }
  return NextResponse.json({ message: "Task not found" }, { status: 404 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const body = await request.json();
  const updatedTask = updateTask(id, body.description, body.completed);
  if (updatedTask) {
    return NextResponse.json(updatedTask);
  }
  return NextResponse.json({ message: "Task not found" }, { status: 404 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const deleted = deleteTask(id);
  if (deleted) {
    return NextResponse.json({ message: "Task deleted" });
  }
  return NextResponse.json({ message: "Task not found" }, { status: 404 });
}
