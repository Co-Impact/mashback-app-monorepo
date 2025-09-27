import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import { FormElementWithLabel } from "../FormElementWithLabel/FormElementWithLabel";
import { FC, useState } from "react";
import { ICaptureTheFlag } from "../../api/types";
import { useUpdateCTF } from "../../api/ctfRequest/updateCTF";
import { useQueryClient } from "@tanstack/react-query";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  isActive: yup.boolean(),
  points: yup
    .number()
    .typeError("Points must be a number")
    .required("Points are required"),
  requiredPoints: yup
    .number()
    .typeError("Points must be a number")
    .required("Points are required"),
});

type FormValue = yup.InferType<typeof schema>;

interface DetailFormProps {
  data: ICaptureTheFlag;
}

const DetailForm: FC<DetailFormProps> = ({ data }) => {
  console.log(data);
  const [editMode, setEditMode] = useState(false);
  const updateCtf = useUpdateCTF();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FormValue>({
    defaultValues: {
      name: data.name,
      description: data.description,
      isActive: data.isActive ?? false,
      points: data.points,
      requiredPoints: data.requiredPoints,
    },
    resolver: yupResolver(schema as any),
  });

  async function onSubmit(formData: FormValue) {
    try {
      await updateCtf.mutateAsync({ id: data.id, data: formData });
      reset(formData);
      setEditMode(false);
      queryClient.refetchQueries({ queryKey: ["ctf", data.id] });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ color: "text.primary", fontWeight: 600 }}
          variant="h6"
          gutterBottom
        >
          Basic Details
        </Typography>
        {!editMode && (
          <Button
            variant="contained"
            endIcon={<EditIcon fontSize="small" />}
            onClick={() => setEditMode(true)}
          >
            Edit
          </Button>
        )}
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <FormElementWithLabel
            label="Name"
            error={!!errors.name && editMode}
            value={
              editMode ? (
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      InputLabelProps={{ shrink: false }}
                      {...field}
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              ) : (
                getValues("name")
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack width={"fit-content"} alignItems={"center"}>
            <FormElementWithLabel
              direction="row"
              label="Status"
              error={!!errors.isActive && editMode}
              value={
                editMode ? (
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label={false}
                      />
                    )}
                  />
                ) : getValues("isActive") ? (
                  "Active"
                ) : (
                  "In Active"
                )
              }
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormElementWithLabel
            label="Points"
            error={!!errors.points && editMode}
            value={
              editMode ? (
                <Controller
                  name="points"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      InputLabelProps={{ shrink: false }}
                      {...field}
                      fullWidth
                      error={!!errors.points}
                      helperText={errors.points?.message}
                    />
                  )}
                />
              ) : (
                getValues("points")
              )
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormElementWithLabel
            label="Required Points"
            error={!!errors.requiredPoints && editMode}
            value={
              editMode ? (
                <Controller
                  name="requiredPoints"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      InputLabelProps={{ shrink: false }}
                      {...field}
                      fullWidth
                      error={!!errors.requiredPoints}
                      helperText={errors.requiredPoints?.message}
                    />
                  )}
                />
              ) : (
                getValues("requiredPoints")
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormElementWithLabel
            label="Description"
            error={!!errors.description && editMode}
            value={
              editMode ? (
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      multiline
                      rows={4}
                      InputLabelProps={{ shrink: false }}
                      {...field}
                      fullWidth
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              ) : (
                getValues("description")
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          {editMode && (
            <Stack spacing={2} direction={"row"} justifyContent={"end"}>
              <Button
                onClick={() => setEditMode(false)}
                color="error"
                variant="text"
              >
                Cancle
              </Button>
              <Button
                type="submit"
                disabled={updateCtf.isPending}
                variant="contained"
              >
                {updateCtf.isPending ? "Saving..." : "Save"}
              </Button>
            </Stack>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default DetailForm;
