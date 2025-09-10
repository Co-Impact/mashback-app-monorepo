import { Chip } from "@mui/material";
import { ITableColumn } from "../../components/Table/types";

export const ProgramColumns: Array<ITableColumn> = [
  {
    id: "name",
    accessorKey: "name",
    header: () => "Name",
  },
  {
    id: "host",
    accessorKey: "host.name",
    header: () => "Host Business",
  },
  {
    id: "cyberWarefareTasks",
    accessorKey: "cyberWarefareTasks",
    header: () => "Tasks",
    cell: (item) => {
      const tasks = item.getValue() as Array<{ name: string }>;
      return tasks.map((t) => t.name).join(", ");
    },
  },
  {
    id: "sessions",
    accessorKey: "sessions",
    header: () => "Users in Session",
    cell: (item) => {
      const sessions = item.getValue() as Array<any>;
      return sessions.length.toString();
    },
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: () => "Status",
    cell: (item) =>
      item.getValue() ? (
        <Chip label="Active" color="success" size="small" />
      ) : (
        <Chip label="Inactive" color="error" size="small" />
      ),
  },
];
