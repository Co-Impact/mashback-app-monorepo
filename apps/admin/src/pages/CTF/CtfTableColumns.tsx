import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { StyledCellContainer } from "./style";
import { ITableColumn } from "../../components/Table/types";

export const CTFTableColumn: Array<ITableColumn> = [
  {
    id: "name",
    accessorKey: "name",
    header: () => "CTF Name",
    cell: (info) => {
      const navigate = useNavigate();
      const row = info.row.original;
      return (
        <Typography
          fontSize="14px"
          color="primary"
          sx={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navigate(`/ctf/${row.id}`)}
        >
          {info.getValue()}
        </Typography>
      );
    },
  },
  {
    id: "isActive",
    accessorKey: "isActive",
    header: () => "Status",
    cell: (info) => {
      const isActive = info.row.original?.isActive;
      return (
        <StyledCellContainer>
          <Typography fontSize="14px">
            {isActive ? "Active" : "In Active"}
          </Typography>
        </StyledCellContainer>
      );
    },
  },
];
