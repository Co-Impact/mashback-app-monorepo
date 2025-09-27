import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { StyledCellContainer } from "./style";
import { ITableColumn } from "../../components/Table/types";
import { AlarmAddTwoTone, AutoGraph } from "@mui/icons-material";

export const LabTableColumns: ITableColumn[] = [
  {
    id: "name",
    accessorKey: "name",
    header: () => "Lab Name",
    cell: (info) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const navigate = useNavigate();
      const row = info.row.original;
      return (
        <Typography
          fontSize="14px"
          color="primary"
          sx={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => navigate(`/labs/${row.id}`)}
        >
          {info.getValue()}
        </Typography>
      );
    },
  },
  {
    id: "difficult",
    accessorKey: "difficult",
    header: () => "Difficulty",
    cell: (info) => (
      <StyledCellContainer>
        <AutoGraph />
        <Typography fontSize="14px">{info.getValue()}</Typography>
      </StyledCellContainer>
    ),
  },
  {
    id: "os",
    accessorKey: "os",
    header: () => "OS",
    cell: (info) => (
      <StyledCellContainer>
        <Typography fontSize="14px">{info.getValue()}</Typography>
      </StyledCellContainer>
    ),
  },
  {
    id: "timeLimit",
    accessorKey: "timeLimit",
    header: () => "Time Limit (min)",
    cell: (info) => (
      <StyledCellContainer>
        <AlarmAddTwoTone />
        <Typography fontSize="14px">{info.getValue()}</Typography>
      </StyledCellContainer>
    ),
  },
];
