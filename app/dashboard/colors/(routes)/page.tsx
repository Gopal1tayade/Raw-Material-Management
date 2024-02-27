import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { ColorClient } from "../_components/client";
import { db } from "@/lib/db";

export const metadata = {
  title: "Colors",
  description: "Manage ans Customize colors.",
};

interface ColorsPageProps {}

const ColorsPage: React.FC<ColorsPageProps> = async ({}) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const colors = await db.color.findMany({
    where: {
      userId: user.id,
    },
  });

  return <ColorClient colors={colors} />;
};

export default ColorsPage;
