import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { db } from "@/lib/db";
import { ColorForm } from "../_components/form";
import { Icons } from "@/components/icons";
import { ColorRemoveButton } from "../../../_components/remove-button";

export const metadata = {
  title: "Color",
  description: "personalize your color preferences",
};

interface ColorPageProps {
  params: {
    colorId: string;
  };
}

const ColorPage: React.FC<ColorPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let color = await db.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Colors"
        text="Color: Effortlessly customize and manage your color choices here."
      >
        {params.colorId !== "new" && (
          <ColorRemoveButton
            colorId={params.colorId}
            variant="destructive"
            size="icon"
          >
            <Icons.trash />
          </ColorRemoveButton>
        )}
      </DashboardHeader>
      <div className="grid gap-10">
        <ColorForm color={color} />
      </div>
    </DashboardShell>
  );
};

export default ColorPage;
