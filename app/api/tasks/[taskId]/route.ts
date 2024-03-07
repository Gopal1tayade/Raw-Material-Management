import { getCurrentUser } from "@/lib/session";
import { z } from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { taskEditSchema } from "@/lib/validations/task";

const routeContextSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    // fetch the unique color.
    const dbTask = await db.task.findUnique({
      where: {
        id: params.taskId,
      },
    });

    return NextResponse.json(dbTask, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    // Ensure user is authentication and has access to this user.
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = taskEditSchema.parse(body);

    // Update the Color.
    const dbUpdatedTask = await db.task.update({
      where: {
        id: params.taskId,
        userId: user.id,
      },
      data: {
        title: payload.title,
        productId: payload.productId,
        priority: payload.priority,
        status: payload.status,
        scheduledAt: payload.scheduledAt,
      },
    });

    return NextResponse.json(dbUpdatedTask, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), {
        status: 422,
      });
    }

    return new NextResponse(null, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    // Ensure user is authentication and has access to this user.
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse(null, { status: 403 });
    }

    // delete the color.
    await db.task.delete({
      where: {
        id: params.taskId,
        userId: user.id,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
