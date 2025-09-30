import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { FC, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { FormElementWithLabel } from "../FormElementWithLabel/FormElementWithLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "../Table/GenericTable";
import { ITableColumn } from "../Table/types";
import { toast } from "react-toastify";
import { useDeleteExample } from "../../api/exampleRequest/postRequest.ts";

const FlagTypes = ["ROOT", "USER", "ADMINISTRATOR", "MACHINE"];

// Updated schema with more fields
const schema = yup.object({
  flag: yup.array(),
});

export type FormValues = yup.InferType<typeof schema>;

const ManageLabFlag: FC<any> = ({ data }) => {
  const update = useDeleteExample();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema as any),
    defaultValues: {
      flag:
        data?.flag?.map((item: { flag: any; type: any; id: any }) => ({
          flag: item.flag,
          type: item.type,
          id: item.id,
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "flag",
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
          Manage Flag
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

      <Stack spacing={4} component={"form"} onSubmit={handleSubmit(handleSave)}>
        <FormElementWithLabel
          label="Flags"
          error={errors.flag && editMode}
          value={
            editMode ? (
              <Container disableGutters>
                {/* Render Dynamic Flags */}
                {fields.map((row, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={row.id}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    {/* Flag Text Field */}
                    <Grid item xs={5}>
                      <Controller
                        name={`flag.${index}.flag`}
                        control={control}
                        rules={{ required: "Flag text is required" }} // Validation Rule
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            InputLabelProps={{ shrink: false }}
                            {...field}
                            variant="outlined"
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            sx={{ height: "100%" }}
                          />
                        )}
                      />
                    </Grid>

                    {/* Flag Type Field */}
                    <Grid item xs={5}>
                      <Controller
                        name={`flag.${index}.type`}
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
                            {FlagTypes.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    </Grid>

                    {/* Delete Button */}
                    <Grid
                      item
                      xs={2}
                      container
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        color="error"
                        onClick={() => remove(index)}
                        sx={{ height: "100%" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  sx={{ width: "fit-content" }}
                  variant="contained"
                  onClick={() => append({ flag: "", type: "" })}
                >
                  Add Flag
                </Button>
              </Container>
            ) : (
              <Stack width={"100%"}>
                <Table data={data?.flag || []} columnsProp={flagColumns} />
              </Stack>
            )
          }
        />

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

export default ManageLabFlag;

const flagColumns: ITableColumn[] = [
  {
    id: "flag",
    accessorKey: "flag",
    header: () => "Flag",
  },
  {
    id: "type",
    accessorKey: "type",
    header: () => "Flag Type",
  },
];
