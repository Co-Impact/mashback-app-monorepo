import { FC } from "react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import {
  Autocomplete,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CloudProvider, CreateLabs, Difficulty } from "../../../api/types.ts";
import { useGetAllCTF } from "../../../api/ctfRequest/getCTF.ts";

interface Props {
  control?: Control<any, any> | undefined;
  packageData: Array<{ name: string; id: string }>;
  watch: UseFormWatch<CreateLabs>;
}

export const LabConfigForm: FC<Props> = ({ control, packageData, watch }) => {
  const cloudProvider = watch("cloudProvider");

  const ctf = useGetAllCTF();
  const isCtf = watch("isCtf");

  const ctfSelect: Record<string, string> =
    ctf?.data?.reduce(
      (
        acc: Record<string, string>,
        item: { id: string | number; name: string },
      ) => {
        acc[item.id] = item.name;
        return acc;
      },
      {},
    ) || {};

  return (
    <Stack spacing={2} sx={{ mt: 4 }}>
      {/* Ports */}
      <Controller
        name="ports"
        control={control}
        rules={{
          required: "Ports are required",
          validate: (value: string[]) => {
            if (!value || value.length === 0) {
              return "Please add at least one port";
            }

            const invalidPorts = value.filter((port) => {
              const num = Number(port);
              return isNaN(num) || num < 0 || num > 99999;
            });

            if (invalidPorts.length > 0) {
              return "Each port must be a number between 0 and 99,999";
            }

            return true;
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            multiple
            freeSolo
            id="ports"
            options={[]}
            value={field.value || []}
            onChange={(_, newValue) => {
              // Keep raw input values (even if invalid)
              field.onChange(newValue);
            }}
            renderTags={(value: readonly any[], getTagProps) =>
              value.map((option: any, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Ports"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        )}
      />

      {/* Package */}
      <Controller
        name="packages"
        control={control}
        rules={{
          validate: (value) =>
            Array.isArray(value) && value.length > 0
              ? true
              : "At least one package must be selected",
        }}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth margin="normal" error={!!error}>
            <InputLabel id="os-select-label">Packages</InputLabel>
            <Select
              multiple
              {...field}
              labelId="os-select-label"
              label="Packages"
              value={field.value}
            >
              {packageData?.map(({ name, id }, key) => (
                <MenuItem key={key} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <Typography
                variant="subtitle2"
                sx={{ ml: 2, fontSize: "12px" }}
                color="error"
              >
                {error.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Difficulty */}
      <Controller
        name="difficult"
        control={control}
        rules={{ required: "Difficulty is required" }}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth margin="normal" error={!!error}>
            <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
            <Select
              {...field}
              labelId="difficulty-select-label"
              label="Difficulty"
            >
              {Object.entries(Difficulty).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <Typography
                variant="subtitle2"
                sx={{ ml: 2, fontSize: "12px" }}
                color={"error"}
              >
                {error.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Region */}
      {!isCtf && (
        <Controller
          name="timeLimit"
          control={control}
          rules={{
            required: "Time limit is required",
            min: { value: 1, message: "Time limit must be greater than 0" },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type={"number"}
              label="Time Limit"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!error}
              helperText={error?.message}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
      )}

      {isCtf && (
        <Controller
          name="ctfId"
          control={control}
          rules={{ required: "Capture the Flag is required" }}
          render={({ field, fieldState: { error } }) => (
            <FormControl fullWidth margin="normal" error={!!error}>
              <InputLabel id="capture-the-flag-select-label">
                Capture The Flag
              </InputLabel>
              <Select
                {...field}
                labelId="capture-the-flag-select-label"
                label="Capture The Flag"
              >
                {Object.entries(ctfSelect).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {error && (
                <Typography
                  variant="subtitle2"
                  sx={{ ml: 2, fontSize: "12px" }}
                  color={"error"}
                >
                  {error.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
      )}

      {/* Additional Azure and AWS fields */}
      {!isCtf && cloudProvider === CloudProvider.AZURE && (
        <>
          {/* Azure Image */}
          <Controller
            name="azureImage"
            control={control}
            rules={{ required: "Azure Image is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                type={"text"}
                label={"Azure Image"}
                {...field}
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </>
      )}

      <Stack direction="row" spacing={2} alignItems="center">
        {cloudProvider === CloudProvider.AWS && (
          <Controller
            name="attachment"
            control={control}
            rules={{
              required: "A file is required",
              validate: {
                onlyOne: (value) =>
                  value.length === 1 || "Only one file can be uploaded",
                isZip: (value) => {
                  const file = value[0];
                  const allowedTypes = [
                    "application/zip",
                    "application/x-zip-compressed",
                  ];
                  return (
                    allowedTypes.includes(file?.type) ||
                    "Only .zip files are allowed"
                  );
                },
                fileSize: (value) => {
                  const file = value[0];
                  const maxSize = 30 * 1024 * 1024; // 30 MB in bytes
                  return (
                    file?.size <= maxSize || "File size must be less than 30 MB"
                  );
                },
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <Stack>
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  multiple={true}
                />
                {error && (
                  <Typography
                    variant="subtitle2"
                    sx={{ ml: 2, fontSize: "12px" }}
                    color={"error"}
                  >
                    {error.message}
                  </Typography>
                )}
              </Stack>
            )}
          />
        )}

        {/* Active Checkbox */}
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} defaultChecked />}
              label="Is Active"
            />
          )}
        />
      </Stack>
    </Stack>
  );
};
