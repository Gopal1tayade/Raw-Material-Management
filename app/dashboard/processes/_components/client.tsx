"use client";

import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { ProcessColumn, columns } from "./columns";
import { useRouter, useParams } from "next/navigation";
import { Process } from "@prisma/client";

interface ExpenseClientProps {
  processes: Array<Process>;
}

export const ProcessClient: React.FC<ExpenseClientProps> = ({ processes }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <DashboardShell>
      <DashboardHeader heading="Process" text="Tailor your Process.">
        <Button onClick={() => router.push(`/dashboard/expenses/new`)}>
          <Icons.add className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </DashboardHeader>
      <div className="grid gap-10">
        <DataTable
          columns={columns}
          data={processes as unknown as ProcessColumn[]}
          filterKey="name"
          icon="process"
          title="Processes"
        />
      </div>
    </DashboardShell>
  );
};
