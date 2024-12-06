import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma, Task } from "@prisma/client";

export async function GET() {
  const tasks: Task[] = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body: Prisma.TaskCreateInput = await request.json();
  const task = await prisma.task.create({
    data: body,
  });
  return NextResponse.json(task);
}
