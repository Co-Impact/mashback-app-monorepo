import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router";
import { ITableColumn } from "../../../components/Table/types.ts";

export const LabTableColumns: ITableColumn[] = [
  {
    id: "logoUrl",
    accessorKey: "labs.labImage",
    header: () => "Logo",
    cell: (item) => <Avatar src={item.row.original.labImage} />,
  },
  {
    id: "name",
    accessorKey: "labs.name",
    header: () => "Lab Name",
    cell: (item) => {
      const labId = item.row.original.id;
      const labName = item.row.original.name;
      return (
        <Link to={`/labs/${labId}`}>
          <Typography sx={{ color: "text.primary" }}>{labName}</Typography>
        </Link>
      );
    },
  },
  {
    id: "difficult",
    accessorKey: "labs.difficult",
    header: () => "Difficult",
    cell: (item) => item.row.original.difficult,
  },
  {
    id: "os",
    accessorKey: "labs.os",
    header: () => "OS",
    cell: (item) => item.row.original.os,
  },
  {
    id: "point",
    accessorKey: "labs.point",
    header: () => "Points",
    cell: (item) => item.row.original.point,
  },
  {
    id: "user",
    accessorKey: "labs.user",
    header: () => "users",
    cell: () => 234,
  },
];
