import { db } from "@/lib/db";
import { ProductForm } from "@/components/forms/product-form";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      color: true,
    },
  });

  const colors = await db.color.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <DashboardShell>
      <ProductForm product={product} colors={colors} />
    </DashboardShell>
  );
};

export default ProductPage;
