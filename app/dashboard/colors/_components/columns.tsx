"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ColorCellActions } from "./cell-actions";
import { ColorShow } from "./color-show";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: Date;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => <ColorShow color={row.original.value} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ColorCellActions data={row.original} />,
  },
];
