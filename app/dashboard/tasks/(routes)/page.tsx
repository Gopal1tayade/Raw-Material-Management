import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { TaskClient } from "../_components/client";
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

  const tasks = await db.task.findMany({
    where: {
      userId: user.id,
    },
  });

  return <TaskClient tasks={tasks} />;
};

export default ColorsPage;
