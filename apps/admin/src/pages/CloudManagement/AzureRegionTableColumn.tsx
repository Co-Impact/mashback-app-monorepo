import { IconButton, Stack } from "@mui/material";
import { ITableColumn } from "../../components/Table/types";
import { Delete, Edit } from "@mui/icons-material";
import { Region } from "../../api/types";

export const getAzureRegionTableColumn = (onEdit:(r:Region)=>void, onDelete:(r:Region)=>void) : ITableColumn[] => [
    {
        id: "AZURERegion",
        accessorKey: "AZURERegion",
        header: () => "Region Name",
    },
    {
        id: "securityGroupId",
        accessorKey: "securityGroupId",
        header: () => "Security Group ID",
    },
    {
        id: "type",
        accessorKey: "type",
        header: () => "Type",
    },
    {
        id: "action",
        accessorKey: "action",
        header: () => "Action",
        cell: (item) => {
            const row = item.row.original
            return (
            <Stack direction={'row'}>
                <IconButton size="small" onClick={()=>onEdit(row)} color="warning" ><Edit fontSize="small" /></IconButton>
                <IconButton size="small" onClick={()=>onDelete(row)} color='error' ><Delete fontSize="small" /></IconButton>
            </Stack>
        )
        }
    },
];