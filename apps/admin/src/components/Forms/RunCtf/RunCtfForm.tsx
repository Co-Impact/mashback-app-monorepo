import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGetAllCTF } from "../../../api/ctfRequest/getCTF";
import { useCreateActiveCtf } from "../../../api/runCtfRequest/postCtf";
import { useQueryClient } from "@tanstack/react-query";
import { CloudProvider } from "../Region/types";
import { useGetRegionByFilter } from "../../../api/regionRequest/getRegions";

type SelectOption = {
  label: string;
  value: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  ctfId: yup.string().required("CTF is required"),
  region: yup.string().required("Region is required"),
  maxParticipants: yup
    .number()
    .required("Participants count is required")
    .typeError("Participants count must be a number"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  isPrize: yup.boolean(),
  isPublic: yup.boolean(),
  requiresRegistration: yup.boolean(),
  prizes: yup
    .array()
    .of(
      yup.object().shape({
        place: yup.number().required(),
        prize: yup.string().required("Prize is required"),
      }),
    )
    .when("isPrize", {
      is: true,
      then: (schema) => schema.min(3, "Provide prizes for 3 places"),
      otherwise: () => yup.array().notRequired(),
    }),
  involve: yup.string().oneOf(["TEAM", "INDIVIDUAL"]).required(),
});

interface RunCtfFormProps {
  close: () => void;
}

const RunCtfForm: React.FC<RunCtfFormProps> = ({ close }) => {
  const ctf = useGetAllCTF();
  const createCtf = useCreateActiveCtf();
  const queryClient = useQueryClient();
  const azureRegionRes = useGetRegionByFilter({
    cloudProvider: CloudProvider.AZURE,
  });
  const azureRegions: SelectOption[] =
    azureRegionRes.data?.map((item: { AZURERegion: string }) => ({
      label: item.AZURERegion as string,
      value: item.AZURERegion as string,
    })) || [];

  const ctfSelectOPtions: SelectOption[] =
    ctf.data?.map((ctf: { id: any; name: any }) => ({
      value: ctf.id,
      label: ctf.name,
    })) || [];

  const theme = useTheme();

  const calendarIconFilter =
    theme.palette.mode === "dark" ? "invert(100%)" : "invert(0%)";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ctfId: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      isPrize: false,
      prizes: [
        { place: 1, prize: "" },
        { place: 2, prize: "" },
        { place: 3, prize: "" },
      ],
      involve: "TEAM",
      maxParticipants: 1,
      isPublic: false,
      requiresRegistration: true,
    },
  });

  const isPrize = useWatch({ control, name: "isPrize" });
  console.log(errors, isPrize);

  const onSubmit = async (data: any) => {
    const payload = {
      ctfId: data.ctfId,
      region: data.region,
      name: data.name,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      involve: data.involve,
      maxParticipants: data.maxParticipants,
      prize: data.isPrize ? data.prizes : [],
      isPublic: data.isPublic,
      requiresRegistration: data.requiresRegistration,
    };
    try {
      await createCtf.mutateAsync(payload);
      queryClient.refetchQueries({ queryKey: ["active-ctf-filter"] });
      close();
    } catch (error) {
      console.error("Error creating CTF:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <Typography variant="h6">Create CTF Entry</Typography>

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Name"
            fullWidth
            {...field}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      {/* CTF Select */}
      <Controller
        name="ctfId"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Select CTF"
            fullWidth
            {...field}
            error={!!errors.ctfId}
            helperText={errors.ctfId?.message}
          >
            {ctfSelectOPtions.map((ctf) => (
              <MenuItem key={ctf.value} value={ctf.value}>
                {ctf.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="region"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth margin="normal" error={!!error}>
            <InputLabel sx={{ color: "text.primary" }}>Region</InputLabel>
            <Select
              {...field}
              label={azureRegionRes.isLoading ? "Loading regions..." : "Region"}
            >
              {azureRegions.map((region) => (
                <MenuItem key={region.value} value={region.value}>
                  {region.label}
                </MenuItem>
              ))}
            </Select>
            {error && (
              <Typography variant="body2" color={"error"}>
                {error.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      {/* Start Date */}
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            label="Start Date"
            fullWidth
            {...field}
            sx={{
              '& input[type="date"]::-webkit-calendar-picker-indicator': {
                filter: calendarIconFilter,
              },
            }}
            error={!!errors.startDate}
            helperText={errors.startDate?.message}
          />
        )}
      />

      {/* End Date */}
      <Controller
        name="endDate"
        control={control}
        render={({ field }) => (
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            label="End Date"
            fullWidth
            {...field}
            sx={{
              '& input[type="date"]::-webkit-calendar-picker-indicator': {
                filter: calendarIconFilter,
              },
            }}
            error={!!errors.endDate}
            helperText={errors.endDate?.message}
          />
        )}
      />

      {/* Involve */}
      <Controller
        name="involve"
        control={control}
        render={({ field }) => (
          <TextField
            select
            label="Involve"
            fullWidth
            {...field}
            error={!!errors.involve}
            helperText={errors.involve?.message}
          >
            <MenuItem value="TEAM">TEAM</MenuItem>
            <MenuItem value="INDIVIDUAL">INDIVIDUAL</MenuItem>
          </TextField>
        )}
      />

      {/* Max Number */}
      <Controller
        name="maxParticipants"
        control={control}
        render={({ field }) => (
          <TextField
            label="Max Participants"
            fullWidth
            {...field}
            error={!!errors.maxParticipants}
            helperText={errors.maxParticipants?.message}
          />
        )}
      />

      {/* Prize Toggle */}
      <Controller
        name="isPrize"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Enable Prizes"
          />
        )}
      />

      {/* Prize Inputs */}
      {isPrize && (
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Prize Details
          </Typography>
          {[1, 2, 3].map((place, idx) => (
            <Controller
              key={place}
              name={`prizes.${idx}.prize`}
              control={control}
              render={({ field }) => (
                <TextField
                  label={`Place ${place} Prize`}
                  fullWidth
                  {...field}
                  error={!!errors.prizes?.[idx]?.prize}
                  helperText={errors.prizes?.[idx]?.prize?.message}
                  sx={{ mb: 1 }}
                />
              )}
            />
          ))}
        </Box>
      )}

      {/* Is Public Toggle */}
      <Controller
        name="isPublic"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Is Public"
          />
        )}
      />

      {/* Registration Required Toggle */}
      <Controller
        name="requiresRegistration"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Registration Required"
          />
        )}
      />

      <Button disabled={createCtf.isPending} type="submit" variant="contained">
        {createCtf.isPending ? "Creating..." : "Create CTF"}
      </Button>
    </Box>
  );
};

export default RunCtfForm;
