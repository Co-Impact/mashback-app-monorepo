import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Typography } from "@mui/material";

import { IDefaultTeamForm } from "./ManageTeam";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteExample } from "../../api/exampleRequest/postRequest.ts";

const schema = yup.object().shape({
  teamName: yup.string().required("Team name is required"),
  members: yup.array(),
  // .min(1, "Select at least one member press confirm changes")
});

export type TeamFormSchema = yup.InferType<typeof schema>;

interface TeamFormModalProps {
  mode: "edit" | "create";
  close: () => void;
  defaultTeamForm: IDefaultTeamForm;
}

const TeamFormModal: React.FC<TeamFormModalProps> = ({
  mode,
  close,
  defaultTeamForm,
}) => {
  const createTeam = useDeleteExample();
  const updateTeam = useDeleteExample();
  const queryClient = useQueryClient();
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      teamName: defaultTeamForm?.teamName || "",
      members: defaultTeamForm?.members?.map((item) => item.id) || [],
    },
  });

  const handleFormSubmit = async (data: TeamFormSchema) => {
    let payload = {} as any;
    if (data?.members?.length) {
      payload["members"] = data.members || [];
    }
    payload = {
      ...payload,
      name: data.teamName,
      ownerId: "",
    };
    if (mode === "create") {
      await createTeam.mutateAsync(payload);
    } else {
      if (!defaultTeamForm?.id) {
        toast("Team ID is missing");
        return;
      }

      await updateTeam.mutateAsync({ data: payload, id: defaultTeamForm.id });
    }
    queryClient.refetchQueries({
      queryKey: ["teams", "by-user-id", ""],
    });
    close();
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ p: 2 }}
      >
        <Box mb={2}>
          <Typography
            sx={{ color: "text.primary" }}
            variant="subtitle1"
            mb={0.5}
          >
            Team Name
          </Typography>
          <Controller
            name="teamName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter team name"
                fullWidth
                error={!!formState.errors.teamName}
                helperText={formState.errors.teamName?.message}
              />
            )}
          />
        </Box>
        <Box mb={2}>
          <Typography
            sx={{ color: "text.primary" }}
            variant="subtitle1"
            mb={0.5}
          >
            Team Members
          </Typography>
        </Box>
        <Box style={{ width: "100%" }}>
          {formState.isSubmitting
            ? mode === "edit"
              ? "Saving..."
              : "Creating..."
            : mode === "edit"
              ? "Save Changes"
              : "Create Team"}
        </Box>
      </Box>
    </>
  );
};

export default TeamFormModal;
