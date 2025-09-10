import { Box, Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material'
import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { CourseFormValues } from '../../Dialog/CourseDialog'

interface CourseConfiguration {
    control: Control<CourseFormValues>
}

const dummyLabs = [
    { id: "lab1", name: "Physics Lab" },
    { id: "lab2", name: "Chemistry Lab" },
    { id: "lab3", name: "Biology Lab" },
];

const CourseConfiguration: FC<CourseConfiguration> = ({control}) => {
    return (
        <Box>
            <Controller
                name="certificate"
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="Certificate"
                    />
                )}
            />

            <Controller
                name="labs"
                control={control}
                render={({ field, formState: {errors} }) => (
                    <TextField
                        {...field}
                        select
                        SelectProps={{
                            multiple: true,
                            value: field.value || [],
                            onChange: (e) => field.onChange(e.target.value),
                        }}
                        label="Labs"
                        fullWidth
                        margin="normal"
                        error={!!errors.labs}
                        helperText={errors.labs?.message}
                    >
                        {dummyLabs.map((lab) => (
                            <MenuItem key={lab.id} value={lab.id}>
                                {lab.name}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <Controller
                name="points"
                control={control}
                render={({ field, formState: {errors} }) => (
                    <TextField
                        {...field}
                        label="Points"
                        fullWidth
                        margin="normal"
                        error={!!errors.points}
                        helperText={errors.points?.message}
                    />
                )}
            />
        </Box>
    )
}

export default CourseConfiguration