import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { productCreateSchema } from "@/lib/validations/product";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = productCreateSchema.parse(body);

    // create the Product.
    const {
      name,
      description,
      color,
      weight,
      unit,
      cost,
      expirationDate,
      productionDate,
      isHazardous,
      isOrganic,
      isRecyclable,
    } = payload;

    const dbProduct = await db.product.create({
      data: {
        name,
        userId: session.user.id,
        description,
        color,
        weight: Number(weight),
        unit,
        cost: Number(cost),
        expirationDate,
        productionDate,
        isHazardous,
        isOrganic,
        isRecyclable,
      },
    });

    return NextResponse.json({ ...dbProduct }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
