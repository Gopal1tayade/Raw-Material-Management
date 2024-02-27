import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { taskSchema } from "./data/schema";
import * as z from "zod";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/dashboard/tasks/data/tasks.json"),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function SettingsPage() {
  const tasks = await getTasks();
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Tasks" text="Manage and create tasks.">
        <Link href="/dashboard/tasks/new" className={buttonVariants()}>
          <Icons.add className="mr-2 h-4 w-4" /> Create New
        </Link>
      </DashboardHeader>
      <div className="grid gap-10">
        <DataTable data={tasks} columns={columns} />
      </div>
    </DashboardShell>
  );
}
