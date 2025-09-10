import { FC } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Box, Button, Container, Grid, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { LabType } from "../../../api/types.ts";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  control?: Control<any, any> | undefined;
}

export const LabFlagsForm: FC<Props> = ({ control }) => {
  const FlagTypes = ["ROOT", "USER", "ADMINISTRATOR", "MACHINE"];

  const handleAddRow = () => {
    append({ flag: "", type: "" });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "flag",
  });

  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      {/* Flag Type Field */}
      <Controller
        name="type"
        control={control}
        rules={{ required: "Flag type is required" }} // Validation Rule
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            select
            fullWidth
            label="Lab Type"
            variant="outlined"
            value={field.value}
            error={!!error}
            helperText={error?.message}
          >
            {Object.entries(LabType).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

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
                    label="Enter Text"
                    {...field}
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    sx={{ height: '100%' }}
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
                    label="Select Flag Type"
                    variant="outlined"
                    error={!!error}
                    helperText={error?.message}
                    sx={{ height: '100%' }}
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
            <Grid item xs={2} container justifyContent="center" alignItems="center">
              <IconButton
                color="error"
                onClick={() => remove(index)}
                sx={{ height: '100%' }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Container>

      {/* Add Flag Button */}
      <Button sx={{ width: 'fit-content' }} variant="contained" onClick={handleAddRow}>
        Add Flag
      </Button>
      
      <Box sx={{ mt: 1 }} />
      {/* Price Field */}
      <Controller
        name="price"
        control={control}
        rules={{
          required: "Price is required", // Validation Rule
          min: { value: 0, message: "Price must be greater than or equal to 0" },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            type="number"
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        )}
      />

      {/* Point Field */}
      <Controller
        name="point"
        control={control}
        rules={{
          required: "Point Count is required", // Validation Rule
          min: { value: 0, message: "Points must be greater than or equal to 0" },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            type="number"
            label="Point Count"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        )}
      />

    </Stack>
  );
};
