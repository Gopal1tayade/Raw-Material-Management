import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { db } from "@/lib/db";
import { ProcessForm } from "../_components/form";
import { Icons } from "@/components/icons";
import { ColorRemoveButton } from "../../../_components/remove-button";

export const metadata = {
  title: "Color",
  description: "personalize your color preferences",
};

interface ProcessPageProps {
  params: {
    processId: string;
  };
}

const ProcessPage: React.FC<ProcessPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const process = await db.process.findUnique({
    where: {
      id: params.processId,
    },
  });

  const products = await db.product.findMany({
    where: {
      userId: user.id
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Processes"
        text="Process. manage your processes"
      >
        {params.processId !== "new" && (
          <ColorRemoveButton
            colorId={params.processId}
            variant="destructive"
            size="icon"
          >
            <Icons.trash />
          </ColorRemoveButton>
        )}
      </DashboardHeader>
      <div className="grid gap-10">
        <ProcessForm process={process} products={products} />
      </div>
    </DashboardShell>
  );
};

export default ProcessPage;
