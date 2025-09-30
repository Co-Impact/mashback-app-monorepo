import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, Edit, PeopleAlt } from "@mui/icons-material";
import { ITableColumn } from "../Table/types"; // Accepts handlers for edit and delete

// Accepts handlers for edit and delete
export const getManageTeamsTableColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}): ITableColumn[] => [
  {
    id: "name",
    accessorKey: "name",
    cell: (info) => {
      const row = info.row.original;
      return (
        <Stack direction="row" alignItems="center" gap={1}>
          <Avatar
            src={row.avatar}
            alt={row.name}
            sx={{ width: 32, height: 32 }}
          />
          <Box>
            <Typography fontWeight={600}>{row.name}</Typography>
          </Box>
        </Stack>
      );
    },
  },
  {
    id: "memberCount",
    accessorKey: "memberCount",
    cell: (info) => {
      const row = info.row.original;
      return (
        <Stack gap={0.5}>
          <Typography fontSize="12px" sx={{ whiteSpace: "nowrap" }}>
            Team members count
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <PeopleAlt fontSize="inherit" />
            <Typography sx={{ color: "text.primary" }}>
              {row?.members?.length || "-"}
            </Typography>
          </Stack>
        </Stack>
      );
    },
  },
  {
    id: "leader",
    accessorKey: "leader",
    cell: (info) => {
      const row = info.row.original;
      return (
        <Stack gap={0.5}>
          <Typography fontSize="12px" sx={{ whiteSpace: "nowrap" }}>
            Team leader name
          </Typography>
          <Typography sx={{ color: "text.primary", whiteSpace: "nowrap" }}>
            {row?.owner?.firstName} {row?.owner?.lastName}
          </Typography>
        </Stack>
      );
    },
  },
  {
    id: "point",
    accessorKey: "point",
    cell: (info) => {
      const row = info.row.original;
      return (
        <Stack gap={0.5}>
          <Typography fontSize="12px" sx={{ whiteSpace: "nowrap" }}>
            Points
          </Typography>
          <Typography sx={{ color: "text.primary", whiteSpace: "nowrap" }}>
            {row?.point || "0"}
          </Typography>
        </Stack>
      );
    },
  },
  {
    id: "members",
    accessorKey: "members",
    cell: (info) => {
      const avatars = info.getValue() as string[];
      if (!avatars.length) {
        return (
          <Stack
            minWidth="200px"
            justifyContent="center"
            direction="row"
            spacing={-1}
          >
            <Typography variant="subtitle2">No members</Typography>
          </Stack>
        );
      }
      return (
        <Stack
          minWidth="200px"
          justifyContent="center"
          direction="row"
          spacing={-1}
        >
          <AvatarGroup
            sx={{
              width: 32,
              height: 32,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
              },
              "& .MuiAvatarGroup-avatar": {
                backgroundColor: "info.dark",
                color: "white",
              },
            }}
            total={avatars.length}
            max={3}
          >
            {avatars.map((src: any, idx) => (
              <Avatar key={idx} alt={src.firstName} src={src?.imageUrl || ""} />
            ))}
          </AvatarGroup>
        </Stack>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    cell: (info) => {
      const row = info.row.original;
      return (
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <IconButton size="small" color="info" onClick={() => onEdit(row)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => onDelete(row)}>
            <Delete />
          </IconButton>
        </Stack>
      );
    },
  },
];
