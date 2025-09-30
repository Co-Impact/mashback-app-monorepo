import { FC, useState } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface Props {
  control: Control<any>;
}

export const LabStepsForm: FC<Props> = ({ control }) => {
  const [counter, setCounter] = useState(0);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "labsSteps",
  });

  const handleAddStep = () => {
    append({ description: "", title: "" });
    setCounter((prev) => ++prev);
  };

  return (
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

        <Button onClick={handleAddStep} variant="contained" color="primary">
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
  );
};
