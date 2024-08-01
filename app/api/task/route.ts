import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { taskSchema } from "@/zod/taskScheme";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsedBody = taskSchema.parse(body);

    const createdTask = await prisma?.task.create({
      data: {
        title: parsedBody.title,
        content: parsedBody.content,
        type: parsedBody.type,
        priority: parsedBody.priority,
        published: parsedBody.published,
        authorId: 1,
        tags: {
          create: parsedBody.tags,
        },
        users: {
          create: parsedBody.users,
        },
      },
      include: {
        users: true,
        tags: true,
      },
    });

    return NextResponse.json(createdTask);
  } catch (e) {
    return new NextResponse("internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const search = searchParams.get("search");

  const filtersMap = new Map<string, any>();
  if (startDate && endDate) {
    filtersMap.set("createdAt", {
      gte: new Date(startDate),
      lte: new Date(endDate),
    });
  }
  if (search) {
    filtersMap.set("title", { contains: search });
  }

  const filters = Object.fromEntries(filtersMap);

  try {
    const tasks = await prisma?.task.findMany({
      where: filters,
      include: {
        users: true,
        author: true,
        tags: true,
      },
    });
    return NextResponse.json(tasks);
  } catch (e) {
    return new NextResponse("internal Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  if (!id) {
    return new NextResponse("Task ID is required", { status: 400 });
  }
  try {
    const updatedTask = await prisma?.task.update({
      where: {
        id: +id,
      },
      data: {
        type: body.type,
      },
      include: {
        users: true,
        tags: true,
      },
    });
    return NextResponse.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (e) {
    return new NextResponse("internal Error", { status: 500 });
  }
}
