"use client";

import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useRouter, useParams } from "next/navigation";
import { Expense } from "@prisma/client";

interface ExpenseClientProps {
  expenses: Array<Expense>;
}

export const ExpenseClient: React.FC<ExpenseClientProps> = ({ expenses }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <DashboardShell>
      <DashboardHeader heading="Expense" text="Tailor your Expense.">
        <Button onClick={() => router.push(`/dashboard/expenses/new`)}>
          <Icons.add className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </DashboardHeader>
      <div className="grid gap-10">
        <DataTable
          columns={columns}
          data={expenses}
          filterKey="name"
          icon="wallet"
          title="Expenses"
        />
      </div>
    </DashboardShell>
  );
};
