import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { FC, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { FormElementWithLabel } from "../FormElementWithLabel/FormElementWithLabel";
import { Delete } from "@mui/icons-material";
import { ITableColumn } from "../Table/types";
import { Table } from "../Table/GenericTable";
import { toast } from "react-toastify";
import { useDeleteExample } from "../../api/exampleRequest/postRequest.ts";

// Updated schema with more fields
const schema = yup.object({
  labsSteps: yup.array().min(1, "At least one Step is required"),
});

export type FormValues = yup.InferType<typeof schema>;

const ManageLabSteps: FC<any> = ({ data }) => {
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
      labsSteps: [],
    },
  });
  const [counter, setCounter] = useState(0);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "labsSteps",
  });

  const handleAddStep = () => {
    append({ description: "", title: "" });
    setCounter((prev) => ++prev);
  };

  useEffect(() => {
    if (!data?.labsSteps?.length) return;
    reset({
      labsSteps: [],
    });
  }, [data, reset]);

  // Handle editing
  const handleEdit = () => setEditMode(true);

  // Handle saving
  const handleSave = async (formData: FormValues) => {
    if (!data.id) {
      toast.error("Lab ID is required");
      return;
    }
    console.log(formData);
    await update.mutateAsync({ id: data.id, data: formData });
    await queryClient.refetchQueries({ queryKey: ["labs", data.id] });
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
          Manage Lab steps
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
          label="Lab Name"
          error={!!errors.labsSteps && editMode}
          value={
            editMode ? (
              <Stack spacing={1}>
                <Stack spacing={2} mt={2}>
                  {fields.map(
                    (item, idx) =>
                      counter === idx && (
                        <Box
                          key={item.id}
                          p={2}
                          border={1}
                          borderRadius={2}
                          sx={{ marginTop: "12px" }}
                        >
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Typography variant="h6">Step {idx + 1}</Typography>
                            <IconButton onClick={() => remove(idx)}>
                              <Delete color="error" fontSize="small" />
                            </IconButton>
                          </Stack>
                          <Controller
                            name={`labsSteps.${idx}.title`}
                            control={control}
                            rules={{ required: "Title is required" }} // Validation Rule
                            render={({ field, fieldState: { error } }) => (
                              <TextField
                                {...field}
                                label="Title"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!error}
                                helperText={error?.message} // Display error message
                              />
                            )}
                          />

                          <Controller
                            name={`labsSteps.${idx}.description`}
                            control={control}
                            rules={{ required: "Description is required" }} // Validation Rule
                            render={({ field, fieldState: { error } }) => (
                              <TextField
                                {...field}
                                label="Description"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!error}
                                helperText={error?.message} // Display error message
                              />
                            )}
                          />
                        </Box>
                      ),
                  )}

                  <Button
                    onClick={handleAddStep}
                    variant="contained"
                    color="primary"
                  >
                    Add Step
                  </Button>
                </Stack>

                <Stack direction="row" spacing={1}>
                  {fields.map((field, index) => (
                    <Button
                      onClick={() => setCounter(index)}
                      key={field.id}
                      variant={index === counter ? "contained" : "outlined"}
                    >
                      Step {index + 1}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            ) : (
              <Stack width={"100%"}>
                <Table
                  data={data?.labsSteps || []}
                  columnsProp={labStepsColumn}
                />
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

export default ManageLabSteps;

const labStepsColumn: ITableColumn[] = [
  {
    id: "title",
    accessorKey: "title",
    header: () => "Title",
  },
  {
    id: "description",
    accessorKey: "description",
    header: () => "Description",
  },
];
