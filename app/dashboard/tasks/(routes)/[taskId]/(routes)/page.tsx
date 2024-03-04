import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { db } from "@/lib/db";
import { TaskForm } from "../_components/form";
import { Icons } from "@/components/icons";
import { ColorRemoveButton } from "../../../_components/remove-button";

export const metadata = {
  title: "Task",
  description: "personalize your Task preferences",
};

interface TaskPageProps {
  params: {
    taskId: string;
  };
}

const TaskPage: React.FC<TaskPageProps> = async ({ params }) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/sign-in");
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
      <DashboardHeader
        heading="Tasks"
        text="Task: Effortlessly customize and manage your Task choices here."
      >
        {params.taskId !== "new" && (
          <ColorRemoveButton
            colorId={params.taskId}
            variant="destructive"
            size="icon"
          >
            <Icons.trash />
          </ColorRemoveButton>
        )}
      </DashboardHeader>
      <div className="grid gap-10">
        <TaskForm task={task} products={products} />
      </div>
    </DashboardShell>
  );
};

export default TaskPage;
