import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form'
import { CourseFormValues } from '../../Dialog/CourseDialog'

interface InformationProps {
    control: Control<CourseFormValues>
}

const Information: FC<InformationProps> = ({ control }) => {
    return (
        <>
            <Controller
                name="name"
                control={control}
                render={({ field, formState: { errors } }) => (
                    <TextField
                        {...field}
                        label="Name"
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({ field, formState: { errors } }) => (
                    <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        multiline
                        rows={4}
                    />
                )}
            />
            <Controller
                name="price"
                control={control}
                render={({ field, formState: { errors } }) => (
                    <TextField
                        {...field}
                        label="Price"
                        fullWidth
                        margin="normal"
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                )}
            />
            <Controller
                name="test"
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={<Checkbox {...field} checked={field.value} />}
                        label="Test"
                    />
                )}
            />
        </>
    )
}

export default Information