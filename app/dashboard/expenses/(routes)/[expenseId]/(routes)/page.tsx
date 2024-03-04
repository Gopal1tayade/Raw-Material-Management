import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { db } from "@/lib/db";
import { ExpenseForm } from "../_components/form";
import { Icons } from "@/components/icons";
import { ColorRemoveButton } from "../../../_components/remove-button";

export const metadata = {
  title: "Color",
  description: "personalize your color preferences",
};

interface ColorPageProps {
  params: {
    expenseId: string;
  };
}

const ColorPage: React.FC<ColorPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const expense = await db.expense.findUnique({
    where: {
      id: params.expenseId,
    },
  });

  const processes = await db.process.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Expense"
        text="Expense: effortlessly manage your expenses here."
      >
        {params.expenseId !== "new" && (
          <ColorRemoveButton
            colorId={params.expenseId}
            variant="destructive"
            size="icon"
          >
            <Icons.trash />
          </ColorRemoveButton>
        )}
      </DashboardHeader>
      <div className="grid gap-10">
        <ExpenseForm expense={expense} processes={processes} />
      </div>
    </DashboardShell>
  );
};

export default ColorPage;
