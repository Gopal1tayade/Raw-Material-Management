"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ColorCellActions } from "./cell-actions";
import { ColorShow } from "./color-show";
import { $Enums } from "@prisma/client";

export type TaskColumn = {
  id: string;
  title: string;
  status: $Enums.Status;
  priority: $Enums.Priority;
  scheduledAt: Date;
};

export const columns: ColumnDef<TaskColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "scheduledAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ColorCellActions data={row.original} />,
  },
];
