"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "./data-table-header";
import { useRouter } from "next/router";
import { Ping } from "@/components/ping";

export type Notification = {
  tagId: string;
  id: string;
  status: string;
  type: string;
  businessName: string;
  email: string;
  sendDate: string | undefined;
  expirationDate: string;
};

export const columns: ColumnDef<Notification>[] = [
  {
    id: "select",
    header: ({ table }) => <div></div>,
    cell: ({ row }) => {
      const notificationStatus = row.getValue("status") as string;

      return (
        <div className="relative">
          <span
            className={
              "absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2"
            }
          >
            <Ping status={notificationStatus} />
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const notificationStatus = row.getValue("status") as string;
      return (
        <Badge variant="outline" className="capitalize relative text-semibold">
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const notificationType = row.getValue("type") as string;
      return <div className="text-left font-medium">{notificationType}</div>;
    },
  },
  {
    accessorKey: "businessName",
    header: () => <div className="text-left">Business Name</div>,
    cell: ({ row }) => {
      const businessName = row.getValue("businessName");

      return (
        <div className="text-left font-normal">{businessName as string}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "sendDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Send Date" />
    ),
    cell: ({ row }) => {
      const sendDate = row.getValue("sendDate") as string | undefined; // Assert to string or undefined
      const date = sendDate ? new Date(sendDate) : new Date();
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(date);

      return <div className="text-left font-normal">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "expirationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiration" />
    ),
    cell: ({ row }) => {
      const expirationDate = row.getValue("expirationDate") as
        | string
        | undefined;
      const date = expirationDate ? new Date(expirationDate) : new Date();
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(date);

      return <div className="text-left font-normal">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const notification = row.original;
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="text-right">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(notification.id)}
              >
                Copy notification ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  window.location.pathname = `/tag/${notification.tagId}`;
                }}
              >
                View tag
              </DropdownMenuItem>
              <DropdownMenuItem>View notification details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
