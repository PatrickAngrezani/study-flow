import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Category, Prisma } from "@prisma/client";

export async function GET() {
  const categories: Category[] = await prisma.category.findMany({
    include: { tasks: true },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body: Prisma.CategoryCreateInput = await request.json();
  const category = await prisma.category.create({
    data: body,
  });
  return NextResponse.json(category);
}
