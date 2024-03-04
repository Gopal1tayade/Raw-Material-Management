"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ColorCellActions } from "./cell-actions";
import { $Enums } from "@prisma/client";

export type ProcessColumn = {
  id: string;
  name: string;
  description: string;
  date: Date;
  status: $Enums.Status;
};

export const columns: ColumnDef<ProcessColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "startDate",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ColorCellActions data={row.original} />,
  },
];
