import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { ExpenseClient } from "../_components/client";
import { db } from "@/lib/db";

export const metadata = {
  title: "Expenses",
  description: "Manage all Expenses.",
};

interface ExpensePageProps {}

const ExpensePage: React.FC<ExpensePageProps> = async ({}) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const expenses = await db.expense.findMany({
    where: {
      userId: user.id,
    },
  });

  return <ExpenseClient expenses={expenses} />;
};

export default ExpensePage;
