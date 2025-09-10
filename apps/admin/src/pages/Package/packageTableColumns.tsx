import { Typography } from "@mui/material";
import { ITableColumn } from "../../components/Table/types";
import { blue } from "@mui/material/colors";

// Accepts handlers for edit and delete
export const getPackageTableColumns = ({
  onEdit,
}: {
  onEdit: (row: any) => void;
}): ITableColumn[] => [
  {
    id: "name",
    accessorKey: "name",
    header: () => "Package Name",
    cell: (item) => {
      const row = item.row.original;

      return (
        <Typography
          onClick={() => onEdit(row)}
          sx={{ textDecoration: "underline", color: blue[500] }}
        >
          {row.name}
        </Typography>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: () => "Created Date",
    cell: (item) => {
      const createdAt = item.row.original.createdAt;
      return (
        <Typography>
          {createdAt && new Date(createdAt).toLocaleDateString()}
        </Typography>
      );
    },
  },
  {
    id: "price",
    accessorKey: "price",
    header: () => "Price",
  },
];
