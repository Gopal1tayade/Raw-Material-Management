import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { ProcessClient } from "../_components/client";
import { db } from "@/lib/db";

export const metadata = {
  title: "Processes",
  description: "Manage all processes.",
};

interface ExpensePageProps { }

const ExpensePage: React.FC<ExpensePageProps> = async ({ }) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const processes = await db.process.findMany({
    where: {
      userId: user.id,
    },
  });


  return <ProcessClient processes={processes} />;
};

export default ExpensePage;
