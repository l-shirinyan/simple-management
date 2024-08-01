import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const usersCount = await prisma?.user.count();

    if (usersCount === 0) {
      const createdUser = await prisma?.user.create({
        data: {
          email: "test@test.com",
          name: "Test User",
        },
      });
      if (!createdUser)
        return new NextResponse("Unauthenticated", { status: 401 });
    }

    return NextResponse.json({ message: "ok" });
  } catch (e) {
    return new NextResponse("internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const cookieStore = req.cookies;
  const userCookie = cookieStore.get("user")?.value;

  if (userCookie) {
    const userId = JSON.parse(userCookie).value;

    const foundUser = await prisma?.user.findUnique({
      where: {
        id: +userId,
      },
    });

    return NextResponse.json({ user: foundUser });
  }

  try {
    const users = await prisma?.user.findMany();
    return NextResponse.json({ users });
  } catch (e) {
    return new NextResponse("internal Error", { status: 500 });
  }
}
