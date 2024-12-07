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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.id || !body.name) {
      return NextResponse.json(
        { error: "'id' and 'name' are required in the request body" },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id: body.id },
      data: { name: body.name },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update the category" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.error("Error deleting cateory:", error);
    return NextResponse.json(
      { error: "Failed to delete the category" },
      { status: 500 }
    );
  }
}
