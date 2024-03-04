import { getCurrentUser } from "@/lib/session";
import * as z from "zod";
import { NextResponse } from "next/server";
import { taskCreateSchema } from "@/lib/validations/task";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = taskCreateSchema.parse(body);

    // Create the color.
    const dbTask = await db.task.create({
      data: {
        userId: user.id,
        description: payload.description,
        scheduledAt: payload.scheduledAt,
        productId: payload.productId,
      },
    });

    return NextResponse.json(dbTask, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), {
        status: 422,
      });
    }

    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Get the colors.
    const dbColors = await db.color.findMany();

    return NextResponse.json(dbColors, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
