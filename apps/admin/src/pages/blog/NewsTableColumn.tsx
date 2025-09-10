import { IconButton, Stack } from "@mui/material";
import { ITableColumn } from "../../components/Table/types";
import { Delete, Edit } from "@mui/icons-material";
import { Region } from "../../api/types";
import { NewsSource } from "../../components/Forms/News/types";

export const getNewsTableColumn = (onEdit:(r:NewsSource)=>void, onDelete:(r:NewsSource)=>void) : ITableColumn[] => [
    {
        id: "name",
        accessorKey: "name",
        header: () => "Title",
    },
    {
        id: "website",
        accessorKey: "website",
        header: () => "Website URL",
    },
    {
        id: "website",
        accessorKey: "feedUrl",
        header: () => "Feed URL",
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