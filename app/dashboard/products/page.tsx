import { redirect } from "next/navigation";
import Link from "next/link";

import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { buttonVariants } from "@/components/ui/button";
import { ProductItem } from "@/components/product-item";
import { Icons } from "@/components/icons";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const products = await db.product.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Products"
        text="Create and manage raw materials at one place."
      >
        <Link href="/dashboard/products/new" className={buttonVariants()}>
          <Icons.add className="mr-2 h-4 w-4" /> Create New
        </Link>
      </DashboardHeader>
      <div>
        {products?.length ? (
          <div className="space-y-5">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="product" />
            <EmptyPlaceholder.Title>No Product created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any product yet. Start creating one.
            </EmptyPlaceholder.Description>
            <Link
              href="/dashboard/products/new"
              className={buttonVariants({ variant: "outline" })}
            >
              <Icons.add className="mr-2 h-4 w-4" /> Create New
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
