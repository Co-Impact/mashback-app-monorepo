import { useModal } from "../../hooks/useModal";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Add, Delete } from "@mui/icons-material";
import { useSendInvite } from "../../api/inviteUserRequest/postInviteRequest.ts";

type InviteFormInputs = {
  emails: { email: string }[];
};

const schema = yup.object({
  emails: yup
    .array()
    .of(
      yup
        .object({
          email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        })
        .required(),
    )
    .min(1, "At least one email is required")
    .required(),
});

const InviteUserDialog = () => {
  const { mutate } = useSendInvite();
  const { Modal, close, isOpen, open } = useModal();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: { emails: [{ email: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });

  const onSubmit = (data: InviteFormInputs) => {
    console.log(data);
    mutate(data.emails);
    close();
  };

  return (
    <>
      <Stack alignItems={"end"}>
        <Button
          sx={{ mt: "12px" }}
          size="small"
          variant="contained"
          onClick={open}
        >
          New
        </Button>
      </Stack>
      <Modal open={isOpen} onClose={close} showCloseIcon>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            fontWeight={"600"}
            variant="h6"
            sx={{ color: "text.primary", mb: 2 }}
          >
            Send Invitation Link
          </Typography>
          <Stack spacing={2}>
            {fields.map((field, index) => (
              <Stack
                direction="row"
                spacing={1}
                key={field.id}
                alignItems="center"
              >
                <Controller
                  name={`emails.${index}.email` as const}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Email ${index + 1}`}
                      type="email"
                      error={!!errors.emails?.[index]?.email}
                      helperText={errors.emails?.[index]?.email?.message}
                      sx={{ width: "80%" }}
                    />
                  )}
                />
                <IconButton
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  color="error"
                >
                  <Delete />
                </IconButton>
                {fields.length === index + 1 && (
                  <IconButton
                    onClick={() => append({ email: "" })}
                    color="info"
                  >
                    <Add />
                  </IconButton>
                )}
              </Stack>
            ))}
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Send Invite
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default InviteUserDialog;
