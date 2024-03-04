import { getCurrentUser } from "@/lib/session";
import * as z from "zod";
import { NextResponse } from "next/server";
import { expenseCreateSchema } from "@/lib/validations/expense";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = expenseCreateSchema.parse(body);

    // Create the expense.
    const dbExpense = await db.expense.create({
      data: {
        userId: user.id,
        description: payload.description,
        amount: Number(payload.amount),
        date: payload.date,
        processId: payload.processId,
        category: payload.category,
        notes: payload.notes,
        PaymentStatus: payload.paymentStatus,
      },
    });

    return NextResponse.json(dbExpense, { status: 201 });
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
    const dbExpenses = await db.expense.findMany();

    return NextResponse.json(dbExpenses, { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
