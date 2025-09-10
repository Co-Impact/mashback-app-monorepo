import { Divider, Stack, Button, Box, useTheme, InputAdornment, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { FormElementWithLabel } from '../../components/FormElementWithLabel/FormElementWithLabel';
import { ErrorOutline } from '@mui/icons-material';
import { useUpdateEvent } from '../../api/eventsRequest/postEvents';
import { IEvent } from '../../api/types';
import { formatDateToLocalInput } from './helper';

// Updated schema with more fields
const schema = yup.object({
    startDate: yup
        .string()
        .required("Start date is required"),
    endDate: yup
        .string()
        .required("Start date is required"),

});

export type FormValues = yup.InferType<typeof schema>;
interface ManageEventDatesProps {
    data: IEvent
}
const ManageEventDates: FC<ManageEventDatesProps> = ({ data }) => {
    const updateEvent = useUpdateEvent()
    const queryClient = useQueryClient()
    const theme = useTheme();
    const calendarIconFilter =
        theme.palette.mode === 'dark'
            ? 'invert(100%)'
            : 'invert(0%)';
    const [editMode, setEditMode] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {

            startDate: data.startDate
                ? formatDateToLocalInput(new Date(data.startDate))
                : '',
            endDate: data.endDate
                ? formatDateToLocalInput(new Date(data.endDate))
                : '',
        },
    });

    // Handle editing
    const handleEdit = () => setEditMode(true);

    // Handle saving
    const handleSave = async (formData: FormValues) => {
        console.log('Saved data:', formData);
        await updateEvent.mutateAsync({ startDate: new Date(formData.startDate), endDate: new Date(formData.endDate), id: data.id })
        queryClient.refetchQueries({ queryKey: ['events', { id: data.id }] })
        reset(formData)
        setEditMode(false);
    };

    // Handle canceling edit mode
    const handleCancel = () => {
        setEditMode(false);
        reset(); // Reset to initial values
    };

    return (
        <Stack borderRadius={2} spacing={3} sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ color: 'text.primary', fontWeight: 600 }} variant="h6" gutterBottom>
                    Manage Event Dates
                </Typography>
                {
                    !editMode &&
                    <Button variant="contained" endIcon={<EditIcon fontSize="small" />} onClick={handleEdit}>
                        Edit
                    </Button>
                }
            </Stack>
            <Divider />

            <Stack spacing={2} component={'form'} onSubmit={handleSubmit(handleSave)}>

                <FormElementWithLabel
                    label="Start Date"
                    error={errors.startDate && editMode}
                    value={editMode ? (
                        < Controller
                            name="startDate"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="datetime-local"
                                    label={false}
                                    InputLabelProps={{ shrink: false }}
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
                    ) : new Date(data.startDate).toLocaleString()}
                />

                <FormElementWithLabel
                    label="End Date"
                    error={errors.endDate && editMode}
                    value={editMode ? (
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="datetime-local"
                                    label={false}
                                    InputLabelProps={{ shrink: false }}
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
                    ) : new Date(data.endDate).toLocaleString()}
                />


                {/* Save and Cancel buttons */}
                {editMode && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button variant="outlined" color="error" onClick={handleCancel} sx={{ marginRight: 2 }}>
                            Cancel
                        </Button>
                        <Button disabled={updateEvent.isPending} variant="contained" type="submit">
                            {updateEvent.isPending ? 'Saving...' : 'Save'}
                        </Button>
                    </Box>
                )}
            </Stack>
        </Stack>
    );
};

export default ManageEventDates;
