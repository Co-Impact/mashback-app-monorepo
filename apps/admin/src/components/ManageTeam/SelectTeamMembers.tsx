import React, { FC, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Undo } from "@mui/icons-material";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import { TeamFormSchema } from "./TeamFormModal";
import { User } from "../../api/types";

export interface TeamUser extends User {
  invitationStatus?: "PENDING" | "ACCEPTED" | "REJECTED";
}

const searchFields = [
  { label: "First Name", value: "firstName" },
  { label: "Email", value: "email" },
];

interface SelectTeamMemberProps {
  setValue: UseFormSetValue<TeamFormSchema>;
  errors: FieldErrors<TeamFormSchema>;
  clearErrors: UseFormClearErrors<TeamFormSchema>;
  defaultMembers: TeamUser[];
}

const SelectTeamMembers: React.FC<SelectTeamMemberProps> = ({
  setValue,
  errors,
  clearErrors,
  defaultMembers,
}) => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = React.useState("firstName");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [teamMembers, setTeamMembers] = useState<TeamUser[]>(
    defaultMembers || [],
  );
  const [pendingAdd, setPendingAdd] = useState<TeamUser[]>([]);
  const [pendingRemove, setPendingRemove] = useState<TeamUser[]>([]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search.length >= 3) {
        setDebouncedSearch(search);
      } else {
        setDebouncedSearch("");
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const handleRemove = (user: TeamUser) => {
    setPendingRemove([...pendingRemove, user]);
  };

  const handleUndoAdd = (id: string) => {
    setPendingAdd(pendingAdd.filter((u) => u.id !== id));
  };

  const handleUndoRemove = (id: string) => {
    setPendingRemove(pendingRemove.filter((u) => u.id !== id));
  };

  const handleConfirm = () => {
    clearErrors("members");
    const updatedMembers = teamMembers
      .filter((u) => !pendingRemove.some((r) => r.id === u.id))
      .concat(pendingAdd);
    console.log({ updatedMembers });
    setTeamMembers(updatedMembers);
    setValue(
      "members",
      updatedMembers.map((item) => item.id),
    );
    setPendingAdd([]);
    setPendingRemove([]);
    setSearch("");
    setDebouncedSearch("");
  };

  return (
    <Box>
      <Typography sx={{ color: "text.disabled" }} variant="body2" gutterBottom>
        Add new or remove existing members in this team.
      </Typography>
      <TextField
        fullWidth
        placeholder="Search and add team members"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        error={!!errors?.members}
        helperText={errors.members?.message}
        InputProps={{
          endAdornment: (
            <Stack alignItems={"center"} direction={"row"} spacing={2}>
              {<CircularProgress size={24} color="inherit" />}
              <InputAdornment position="end">
                <FormControl variant="standard" sx={{ minWidth: 100 }}>
                  <Select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    disableUnderline
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {searchFields.map((field) => (
                      <MenuItem key={field.value} value={field.value}>
                        {field.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </InputAdornment>
            </Stack>
          ),
        }}
      />
      <List>
        {
          <Typography variant="body1" color="error.main">
            Error fetching users
          </Typography>
        }
        {teamMembers.map((user) => (
          <ListItem key={user.id}>
            <Stack
              direction={"row"}
              width={"100%"}
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <UserItem
                invitationStatus={user?.invitationStatus}
                name={`${user.firstName} ${user.lastName}`}
                email={user.email}
                imageUrl={user.imageUrl}
              />
              {pendingRemove.some((u) => u.id === user.id) ? (
                <IconButton onClick={() => handleUndoRemove(user.id!)}>
                  <Undo />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleRemove(user)}>
                  <Delete />
                </IconButton>
              )}
            </Stack>
          </ListItem>
        ))}
        {pendingAdd.map((user) => (
          <ListItem key={user.id}>
            <Stack
              width={"100%"}
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <UserItem
                name={`${user.firstName} ${user.lastName}`}
                email={user.email}
                imageUrl={user.imageUrl}
              />
              <IconButton onClick={() => handleUndoAdd(user.id!)}>
                <Undo />
              </IconButton>
            </Stack>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            setPendingAdd([]);
            setPendingRemove([]);
            setSearch("");
            setDebouncedSearch("");
          }}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Confirm changes
        </Button>
      </Box>
    </Box>
  );
};

export default SelectTeamMembers;

interface UserItemProps {
  name: string;
  email: string;
  imageUrl?: string;
  invitationStatus?: "PENDING" | "ACCEPTED" | "REJECTED";
}
const UserItem: FC<UserItemProps> = ({
  name,
  email,
  imageUrl,
  invitationStatus = "",
}) => {
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      spacing={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        {imageUrl ? <Avatar src={imageUrl} /> : <Avatar>{name[0]}</Avatar>}
        <Stack>
          <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
            {name}
          </Typography>
          <Typography variant="subtitle2">{email}</Typography>
        </Stack>
      </Stack>
      <Typography
        sx={{
          color:
            invitationStatus === "ACCEPTED"
              ? "success"
              : invitationStatus === "REJECTED"
                ? "error"
                : "yellow",
        }}
        variant="body2"
      >
        {invitationStatus}
      </Typography>
    </Stack>
  );
};
