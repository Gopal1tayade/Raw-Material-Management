import { getCurrentUser } from "@/lib/session";
import * as z from "zod";
import { NextResponse } from "next/server";
import { processCreateSchema } from "@/lib/validations/process";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = processCreateSchema.parse(body);

    // Create the expense.
    const dbProcess = await db.process.create({
      data: {
        userId: user.id,
        description: payload.description,
        name: payload.name,
        productId: payload.productId,
        duration: Number(payload.duration),
        humidity: Number(payload.humidity),
        pressure: Number(payload.pressure),
        startDate: payload.startDate,
        status: payload.status,
        temperature: Number(payload.temperature),
      },
    });

    return NextResponse.json(dbProcess, { status: 201 });
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
    const dbProcess = await db.process.findMany();

    return NextResponse.json(dbProcess, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
