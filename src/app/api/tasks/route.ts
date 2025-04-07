import { createTask, getTasks } from "@/lib/tasks";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const tasks = getTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newTask = createTask(body.description, body.completed);
  return NextResponse.json(newTask, { status: 201 });
}
