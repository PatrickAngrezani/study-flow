import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const task = await prisma.task.create({
    data: body,
  });
  return NextResponse.json(task);
}
