import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    if (!params.id) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const bilboard = await prisma?.user.findUnique({
      where: {
        id: +params.id,
      },
      include : {
        tasks: true,
        taskUser : true,
      }
    });
    
    return NextResponse.json(bilboard);
  } catch (e) {
    return new NextResponse("internal Error", { status: 500 });
  }
}
