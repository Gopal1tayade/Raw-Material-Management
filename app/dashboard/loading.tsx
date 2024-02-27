import { DashboardHeader } from "@/components/header";
import { Button } from "@/components/ui/button";

import { DashboardShell } from "@/components/shell";
import { Icons } from "@/components/icons";

export default function DashboardLoading() {
  return (
    <DashboardShell className="flex h-full flex-col">
      <div className="divide-border-200 divide-y rounded-md w-full flex items-center justify-center border flex-1">
        <Icons.spinner className="mr-2 h-10 w-10 animate-spin" />
      </div>
    </DashboardShell>
  );
}
