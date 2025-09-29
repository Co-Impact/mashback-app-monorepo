import { Typography } from "@mui/material";
import { Link } from "react-router";
import { ITableColumn } from "../../../components/Table/types.ts";

export const EventsTableColumns: ITableColumn[] = [
  {
    id: "title",
    accessorKey: "Events.title",
    header: () => "Event Name",
    cell: (item) => {
      const event = item.row.original.Events;
      return (
        <Typography
          component={Link}
          to={`/events/${event.id}`}
          sx={{ color: "text.primary" }}
        >
          {event.title}
        </Typography>
      );
    },
  },
  {
    id: "startDate",
    accessorKey: "Events.startDate",
    header: () => "Start Date",
    cell: (item) => {
      const date = new Date(item.row.original.Events.startDate);
      return date.toLocaleDateString();
    },
  },
  {
    id: "endDate",
    accessorKey: "Events.endDate",
    header: () => "End Date",
    cell: (item) => {
      const date = new Date(item.row.original.Events.endDate);
      return date.toLocaleDateString();
    },
  },
  {
    id: "location",
    accessorKey: "Events.location",
    header: () => "Location",
    cell: (item) => item.row.original.Events.location,
  },
];
