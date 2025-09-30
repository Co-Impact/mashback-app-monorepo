import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { FormElementWithLabel } from "../FormElementWithLabel/FormElementWithLabel";
import { ErrorOutline } from "@mui/icons-material";
import { Difficulty } from "../../api/types";
import { toast } from "react-toastify";
import { useDeleteExample } from "../../api/exampleRequest/postRequest.ts";

// Updated schema with more fields
const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  tag: yup
    .array()
    .of(yup.string().required("Each tag must be a string"))
    .min(1, "At least one tag is required"),
  isActive: yup.boolean(),
  type: yup.string().required("Lab type is required"),
  price: yup
    .number()
    .required("Price is required")
    .typeError("Must be a number"),
  point: yup
    .number()
    .required("Point is required")
    .typeError("Must be a number"),
  difficult: yup
    .string()
    .required("Lab difficulty is required")
    .oneOf(Object.values(Difficulty), "Invalid difficulty"),
});

export type FormValues = yup.InferType<typeof schema>;

interface ManageLabBasicDetailsProps {
  data: any;
}
const ManageLabBasicDetails: FC<ManageLabBasicDetailsProps> = ({ data }) => {
  const update = useDeleteExample();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver(schema as any),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      tag: data?.tag || [],
      isActive: data.isActive || false,
      type: data?.type || "",
      price: data?.price || 0,
      point: data?.point || 0,
      difficult: data?.difficult || "",
    },
  });

  // Handle editing
  const handleEdit = () => setEditMode(true);

  // Handle saving
  const handleSave = async (formData: FormValues) => {
    if (!data.id) {
      toast.error("Lab ID is required");
      return;
    }
    await update.mutateAsync({ id: data.id, data: formData });
    queryClient.refetchQueries({ queryKey: ["labs", data.id] });
    reset(formData);
    setEditMode(false);
  };

  // Handle canceling edit mode
  const handleCancel = () => {
    setEditMode(false);
    reset(); // Reset to initial values
  };

  return (
    <Stack
      borderRadius={2}
      spacing={3}
      sx={{ p: 2, bgcolor: "background.paper", color: "text.primary" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ color: "text.primary", fontWeight: 600 }}
          variant="h6"
          gutterBottom
        >
          Manage Lab Details
        </Typography>
        {!editMode && (
          <Button
            variant="contained"
            endIcon={<EditIcon fontSize="small" />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
      </Stack>
      <Divider />

      <Stack spacing={3} component={"form"} onSubmit={handleSubmit(handleSave)}>
        <FormElementWithLabel
          label="Lab Name"
          error={!!errors.name && editMode}
          value={
            editMode ? (
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    InputProps={{
                      endAdornment: !!errors.name && (
                        <InputAdornment position="end">
                          <ErrorOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            ) : (
              data?.name
            )
          }
        />

        <Divider />
        <Stack direction={"row"} spacing={2}>
          <FormElementWithLabel
            label="Lab Type"
            error={!!errors.type && editMode}
            value={
              editMode ? (
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Flag type is required" }} // Validation Rule
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      value={field.value}
                      error={!!error}
                      helperText={error?.message}
                    ></TextField>
                  )}
                />
              ) : (
                data?.type
              )
            }
          />

          <FormElementWithLabel
            label="Lab Name"
            error={!!errors.difficult && editMode}
            value={
              editMode ? (
                <Controller
                  name={`difficult`}
                  control={control}
                  rules={{ required: "Flag type is required" }} // Validation Rule
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      select
                      fullWidth
                      InputLabelProps={{ shrink: false }}
                      variant="outlined"
                      error={!!error}
                      helperText={error?.message}
                      sx={{ height: "100%" }}
                    >
                      {Object.entries(Difficulty).map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              ) : (
                data?.difficult
              )
            }
          />
        </Stack>

        <Divider />

        <Stack direction={"row"}>
          <FormElementWithLabel label="Os" value={data?.os} />

          <FormElementWithLabel
            label="Cloud Provider"
            value={data?.cloudProvider}
          />
        </Stack>

        <Divider />

        <Stack direction={"row"} spacing={2}>
          <FormElementWithLabel
            label="Price"
            error={errors.price && editMode}
            value={
              editMode ? (
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Price"
                      fullWidth
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      InputProps={{
                        endAdornment: !!errors.price && (
                          <InputAdornment position="end">
                            <ErrorOutline />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              ) : (
                data?.price
              )
            }
          />

          <FormElementWithLabel
            label="Points"
            error={errors.price && editMode}
            value={
              editMode ? (
                <Controller
                  name="point"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Points"
                      fullWidth
                      error={!!errors.point}
                      helperText={errors.point?.message}
                      InputProps={{
                        endAdornment: !!errors.point && (
                          <InputAdornment position="end">
                            <ErrorOutline />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              ) : (
                data?.point
              )
            }
          />
        </Stack>

        <Divider />

        <FormElementWithLabel
          label="Description"
          error={errors.description && editMode}
          value={
            editMode ? (
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={4}
                    placeholder="Description"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    InputProps={{
                      endAdornment: !!errors.description && (
                        <InputAdornment position="end">
                          <ErrorOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            ) : (
              data?.description
            )
          }
        />

        <Divider />

        <FormElementWithLabel
          label="Tags"
          error={errors.tag && editMode}
          value={
            editMode ? (
              <Controller
                name="tag"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    multiple
                    fullWidth
                    freeSolo
                    id="tag-autocomplete"
                    options={[]}
                    value={field.value}
                    onChange={(_, newValue) => field.onChange(newValue)} // Directly store strings
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        InputLabelProps={{ shrink: false }}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
            ) : (
              <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                {data.tag.map((t: string, i: number) => (
                  <Chip
                    key={i}
                    label={t.replace(/[[\]"]/g, "")}
                    variant="outlined"
                  />
                ))}
              </Stack>
            )
          }
        />

        <Divider />

        <Stack width={"fit-content"} alignItems={"center"}>
          <FormElementWithLabel
            direction="row"
            label="Lab Status"
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
                ": Active"
              ) : (
                ": In Active"
              )
            }
          />
        </Stack>

        <Divider />

        <Stack direction={"row"}>
          <FormElementWithLabel label="No SQL ID" value={data?.noSQLID} />

          <FormElementWithLabel
            label="Repository Name"
            value={data?.repositoryName}
          />
        </Stack>

        <Divider />

        {/* Save and Cancel buttons */}
        {editMode && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button
              disabled={update.isPending}
              variant="contained"
              type="submit"
            >
              {update.isPending ? "Saving..." : "Save"}
            </Button>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default ManageLabBasicDetails;
