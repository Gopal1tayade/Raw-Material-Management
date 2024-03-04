"use client";

import { DashboardHeader } from "@/components/header";
import { Icons } from "@/components/icons";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { useRouter, useParams } from "next/navigation";
import { Task } from "@prisma/client";

interface TaskClientProps {
  tasks: Array<Task>;
}

export const TaskClient: React.FC<TaskClientProps> = ({ tasks }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <DashboardShell>
      <DashboardHeader heading="Tasks" text="Tailor your Tasks effortlessly.">
        <Button onClick={() => router.push(`/dashboard/tasks/new`)}>
          <Icons.add className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </DashboardHeader>
      <div className="grid gap-10">
        <DataTable
          columns={columns}
          data={tasks}
          filterKey="title"
          icon="task"
          title="Tasks"
        />
      </div>
    </DashboardShell>
  );
};
