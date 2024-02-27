import { db } from "@/lib/db";
import { TaskForm } from "@/components/forms/task-form";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

interface TaksPageProps {
  params: { taskId: string };
}

const TaskPage: React.FC<TaksPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const task = await db.task.findUnique({
    where: {
      id: params.taskId,
    },
  });

  const products = await db.product.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <DashboardShell>
      <TaskForm task={task} products={products} />
    </DashboardShell>
  );
};

export default TaskPage;
