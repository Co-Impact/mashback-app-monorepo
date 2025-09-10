import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Checkbox,
  Stack,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventType } from "../../../api/types.ts";
import * as yup from "yup";
import { usePostEvent } from "../../../api/eventsRequest/postEvents.ts";
import { useQueryClient } from "@tanstack/react-query";

const eventsFormSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  startDate: yup
    .string()
    .required("Start date is required"),
  endDate: yup
    .string()
    .required("End date is required")
    .test("is-after-start", "End date must be after start date", function (value) {
      const { startDate } = this.parent;
      return new Date(value) > new Date(startDate);
    }),
  type: yup.string().required("Event type is required"),
  note: yup.string().required("Note is required"),
  isActive: yup.boolean(),
});


const steps = ["Details", "Configuration"];

export interface EventsFormStepperProps {
  closeDialog: () => void;
}

export const EventsFormStepper: FC<EventsFormStepperProps> = ({ closeDialog }) => {
  const [activeStep, setActiveStep] = useState(0);
  const isNightMode = useTheme().palette.mode === "dark";
  const queryClient = useQueryClient()

  const calendarIconFilter = isNightMode ? "invert(100%)" : "invert(0%)";
  const createEvent = usePostEvent()
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(eventsFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      type: "",
      note: "",
      isActive: false,
    },
  });

  const handleNext = async () => {
    const valid = await trigger(
      activeStep === 0
        ? ["title", "description", "location", "startDate", "endDate"]
        : ["type", "note"]
    );
    if (valid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data: any) => {
    console.log("Submitted data:", data);
    data.startDate = new Date(data.startDate).toISOString()
    data.endDate = new Date(data.endDate).toISOString()
    await createEvent.mutateAsync(data)
    queryClient.refetchQueries({queryKey: ["events"]})
    closeDialog();
  };

  return (
    <Box width="100%">
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  rows={3}
                  label="Description"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Location"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="datetime-local"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                  fullWidth
                  sx={{
                    '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
                      filter: calendarIconFilter,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="datetime-local"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                  fullWidth
                  sx={{
                    '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
                      filter: calendarIconFilter,
                    },
                  }}
                />
              )}
            />
          </Stack>
        )}

        {activeStep === 1 && (
          <Stack spacing={2}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel id="type-label">Event Type</InputLabel>
                  <Select {...field} labelId="type-label" label="Event Type">
                    {Object.entries(EventType).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.type?.message}
                  </Typography>
                </FormControl>
              )}
            />
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField
                  multiline
                  rows={4}
                  {...field}
                  label="Note"
                  error={!!errors.note}
                  helperText={errors.note?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Is Active"
                />
              )}
            />
          </Stack>
        )}

        <Box mt={4} display="flex" justifyContent="space-between">
          {activeStep > 0 && (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button disabled={createEvent.isPending} variant="contained" type="submit">
              {createEvent.isPending ?  'Creating...': 'Create Event'}
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};
