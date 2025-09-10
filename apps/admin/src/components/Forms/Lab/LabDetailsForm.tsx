import { Control, Controller, UseFormSetValue, useWatch } from "react-hook-form";
import { FC, useEffect } from "react";
import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CloudProvider, OSType } from "../../../api/types.ts";

interface Props {
  control?: Control<any, any> | undefined;
  setValue: UseFormSetValue<any>
}

export const LabDetailsForm: FC<Props> = ({ control, setValue }) => {

  const isCtfValue = useWatch({ control, name: 'isCtf' })
  const osValue = useWatch({ control, name: 'os' })


  useEffect(() => {
    if (osValue === OSType.WINDOWS) {
      setValue('cloudProvider', CloudProvider.AZURE)
    }
  }, [osValue])


  useEffect(() => {
    if (isCtfValue) {
      setValue('os', OSType.WINDOWS)
      setValue('cloudProvider', CloudProvider.AZURE)
    }
  }, [isCtfValue])


  return (
    <>
      {/* Name Field */}
      <Controller
        name="name"
        control={control}
        rules={{
          required: "Lab name is required",
          maxLength: {
            value: 10,
            message: "Lab name must be at most 10 characters"
          }
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            type="text"
            label="Name"
            {...field}
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />

      {/* Description Field */}
      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }} // Validation Rule
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="Description"
            {...field}
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
            multiline
            rows={4}
          />
        )}
      />

      {/* Tags Field */}
      <Controller
        name="tag"
        control={control}
        rules={{
          validate: (value) => value.length > 0 || "At least one tag is required", // Custom validation rule
        }}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            multiple
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
                label="Add Tags"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />


      {/* CTF Checkbox and Select (conditionally shown if isCtf is true) */}
      <Controller
        name="isCtf"
        control={control}
        render={({ field, }) => {
          return (
            <FormControlLabel
              control={<Checkbox {...field} checked={isCtfValue} />}
              label="Enable Capture The Flag?"
            />
          )
        }}
      />

      {/* Operating System Field */}
      <Controller
        name="os"
        control={control}
        rules={{
          required: "Operating system is required", // Validation Rule
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormControl fullWidth margin="normal" error={!!error}>
              <InputLabel id="os-select-label">Operating System</InputLabel>
              <Select
                {...field}
                labelId="os-select-label"
                label="Operating System"
                value={field.value}
              >
                {Object.entries(OSType).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {error && <p style={{ color: 'red' }}>{error.message}</p>} {/* Display error */}
            </FormControl>
          )
        }}
      />

      {/* Cloud Provider Field */}
      <Controller
        name="cloudProvider"
        control={control}
        rules={{
          required: "Cloud Provider is required", // Validation Rule
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth margin="normal" error={!!error}>
            <InputLabel id="cloud-provider-select-label">Cloud Provider</InputLabel>
            <Select
              disabled={isCtfValue}
              {...field}
              labelId="cloud-provider-select-label"
              label="Cloud Provider"
              value={field.value}
            >
              {Object.entries(CloudProvider).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {error && <p style={{ color: 'red' }}>{error.message}</p>} {/* Display error */}
          </FormControl>
        )}
      />
    </>
  );
};
