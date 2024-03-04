"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ColorCellActions } from "./cell-actions";
import { $Enums } from "@prisma/client";

export type ExpenseColumn = {
  id: string;
  description: string;
  amount: number;
  category: $Enums.ExpenseCategory;
  date: Date;
};

export const columns: ColumnDef<ExpenseColumn>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ColorCellActions data={row.original} />,
  },
];
