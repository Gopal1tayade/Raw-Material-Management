import { getCurrentUser } from "@/lib/session";
import { z } from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { colorEditSchema } from "@/lib/validations/color";

const routeContextSchema = z.object({
  params: z.object({
    colorId: z.string(),
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
    const dbColor = await db.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(dbColor, { status: 200 });
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
    const payload = colorEditSchema.parse(body);

    // Update the Color.
    const dbUpdatedColor = await db.color.update({
      where: {
        id: params.colorId,
        userId: user.id,
      },
      data: {
        name: payload.name,
        value: payload.value,
      },
    });

    return NextResponse.json(dbUpdatedColor, { status: 200 });
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
    await db.color.delete({
      where: {
        id: params.colorId,
        userId: user.id,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
