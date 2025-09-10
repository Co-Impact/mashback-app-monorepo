// columns/EventLogColumns.tsx
import type { ITableColumn } from "../../components/Table/types";
import { Typography, Chip, Stack, Link } from "@mui/material";
import {
  BugReport,
  Error,
  Warning,
  Info,
  Terminal,
} from "@mui/icons-material";

const eventTypeMeta: Record<
  string,
  { label: string; color: string; icon: JSX.Element }
> = {
  fatal: { label: "Fatal", color: "error", icon: <BugReport fontSize="small" /> },
  error: { label: "Error", color: "error", icon: <Error fontSize="small" /> },
  warn: { label: "Warning", color: "warning", icon: <Warning fontSize="small" /> },
  debug: { label: "Debug", color: "default", icon: <Terminal fontSize="small" /> },
  log: { label: "Log", color: "info", icon: <Info fontSize="small" /> },
};

export const EventLogColumns: ITableColumn[] = [
  {
    id: "type",
    accessorKey: "type",
    header: () => "Event Type",
    cell: (item) => {
      const type = item.row.original.type;
      const meta = eventTypeMeta[type] || eventTypeMeta["log"];
      return (
        <Chip
          icon={meta.icon}
          label={meta.label}
          color={meta.color as any}
          variant="outlined"
          size="small"
        />
      );
    },
  },
  {
    id: "timestamp",
    accessorKey: "timestamp",
    header: () => "Date & Time",
    cell: (item) => {
      const date = new Date(item.row.original.timestamp);
      return (
        <Typography variant="body2">
          {date.toLocaleString()}
        </Typography>
      );
    },
  },
  {
    id: "service",
    accessorKey: "service",
    header: () => "Service Name",
    cell: (item) => (
      <Typography variant="body2">{item.row.original.service}</Typography>
    ),
  },
  {
    id: "message",
    accessorKey: "message",
    header: () => "Message",
    cell: (item) => {
      const msg = item.row.original.message;
      const short = msg.length > 50 ? msg.slice(0, 50) + "..." : msg;
      return (
        <Stack direction="row" spacing={1}>
          <Typography variant="body2">{short}</Typography>
          {msg.length > 50 && (
            <Link href="#" underline="hover">
              See more
            </Link>
          )}
        </Stack>
      );
    },
  },
];
