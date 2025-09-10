import { Divider, Stack, Button, Box, useTheme, InputAdornment, Typography, TextField } from '@mui/material';
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

// Updated schema with more fields
const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    location: yup.string().required('Location is required'),
});

export type FormValues = yup.InferType<typeof schema>;
interface ManageBasicDetailsProps {
    data: IEvent
}
const ManageBasicDetails: FC<ManageBasicDetailsProps> = ({ data }) => {
    const updateEvent = useUpdateEvent()
    const queryClient = useQueryClient()
    const theme = useTheme();
    const [editMode, setEditMode] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: data?.title || '',
            description: data?.description || '',
            location: data?.location || '',
        },
    });

    // Handle editing
    const handleEdit = () => setEditMode(true);

    // Handle saving
    const handleSave = async (formData: FormValues) => {
        await updateEvent.mutateAsync({...formData, id: data.id})
        queryClient.refetchQueries({queryKey: ['events',{id: data.id}]})
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
                    Manage Basic Information
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
                    label="Title"
                    error={!!errors.title && editMode}
                    value={editMode ? (

                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    placeholder="Title"
                                    fullWidth
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    InputProps={{
                                        endAdornment: !!errors.title && (
                                            <InputAdornment position="end">
                                                <ErrorOutline />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />

                    ) : data?.title}
                />

                <Stack direction={{ md: 'row', sm: 'column' }} spacing={4}>

                    <FormElementWithLabel
                        label="Description"
                        error={errors.description && editMode}
                        value={editMode ? (
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
                        ) : data?.description}
                    />

                    <FormElementWithLabel
                        label="Location"
                        error={errors.location && editMode}
                        value={editMode ? (
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        multiline
                                        rows={4}
                                        placeholder="Location"
                                        fullWidth
                                        error={!!errors.location}
                                        helperText={errors.location?.message}
                                        InputProps={{
                                            endAdornment: !!errors.location && (
                                                <InputAdornment position="end">
                                                    <ErrorOutline />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        ) : data?.location}
                    />
                </Stack>


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

export default ManageBasicDetails;
