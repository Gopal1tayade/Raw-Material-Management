import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserNameForm } from "@/components/user-name-form";
import { UserAddressForm } from "@/components/user-address-form";
import { db } from "@/lib/db";
export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      address: {
        select: {
          street: true,
          city: true,
          state: true,
          postalCode: true,
        },
      },
    },
  });
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <UserAddressForm user={{ id: user.id, address: dbUser?.address }} />
      </div>
    </DashboardShell>
  );
}
