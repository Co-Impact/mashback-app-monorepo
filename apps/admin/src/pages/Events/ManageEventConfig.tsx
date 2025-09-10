import { Divider, Stack, Button, Box, useTheme, InputAdornment, Typography, TextField, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { FormElementWithLabel } from '../../components/FormElementWithLabel/FormElementWithLabel';
import { ErrorOutline } from '@mui/icons-material';
import { useUpdateEvent } from '../../api/eventsRequest/postEvents';
import { EventType, IEvent } from '../../api/types';

// Updated schema with more fields
const schema = yup.object({
    type: yup.string().required('Type is required'),
    note: yup.string().required('Note is required'),
    isActive: yup.boolean(),
});

export type FormValues = yup.InferType<typeof schema>;
interface ManageEventConfigProps {
    data: IEvent
}
const ManageEventConfig: FC<ManageEventConfigProps> = ({ data }) => {
    const updateEvent = useUpdateEvent()
    const queryClient = useQueryClient()
    const theme = useTheme();
    const [editMode, setEditMode] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        getValues
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            note: data?.note || '',
            type: data?.type || '',
            isActive: data.isActive || false
        },
    });

    // Handle editing
    const handleEdit = () => setEditMode(true);

    // Handle saving
    const handleSave = async (formData: FormValues) => {
        await updateEvent.mutateAsync({ ...formData, id: data.id })
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
                    Manage Event Configuration
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
                    label="Note"
                    error={errors.note && editMode}
                    value={editMode ? (
                        <Controller
                            name="note"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    multiline
                                    rows={4}
                                    placeholder="Description"
                                    fullWidth
                                    error={!!errors.note}
                                    helperText={errors.note?.message}
                                    InputProps={{
                                        endAdornment: !!errors.note && (
                                            <InputAdornment position="end">
                                                <ErrorOutline />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    ) : data?.note}
                />
                <FormElementWithLabel
                    label="Event Type"
                    error={errors.note && editMode}
                    value={editMode ? (
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth error={!!errors.type}>
                                    <Select {...field} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
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
                    ) : data?.type}
                />

                <Stack width={'fit-content'} alignItems={'center'}>
                    <FormElementWithLabel
                        direction='row'
                        label="Status"
                        error={!!errors.isActive && editMode}
                        value={editMode ? (
                            <Controller
                                name="isActive"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={field.value} />}
                                        label={false}
                                    />
                                )}
                            />
                        ) :
                            getValues('isActive') ? 'Active' : 'In Active'
                        }
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

export default ManageEventConfig;
