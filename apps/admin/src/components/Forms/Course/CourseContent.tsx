import { Box, Button, IconButton, Stack, TextField, Typography, useTheme } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Control, Controller, useFieldArray } from 'react-hook-form'
import { CourseFormValues } from '../../Dialog/CourseDialog'
import { Delete } from '@mui/icons-material';

interface CourseContentProps {
    control: Control<CourseFormValues>;
}

const CourseContent: FC<CourseContentProps> = ({ control }) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: "content"
    });
    const [counter, setCounter] = useState(fields.length - 1);

    const theme = useTheme();

    const handleAddContent = () => {
        append({ title: "", time: new Date().toISOString().slice(0, 16), description: "" })
    }
    const calendarIconFilter =
        theme.palette.mode === 'dark'
            ? 'invert(100%)'
            : 'invert(0%)';
    return (
        <Box>
            {/* <Button onClick={()=>} >{counter}</Button> */}
            {fields.map((item, index) => (
                index === counter && <Box key={item.id} sx={{ mb: 2, border: "1px solid #ccc", p: 1, px: 2, borderRadius: 1 }}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant="subtitle2" >
                            Content #{index + 1}
                        </Typography>
                        {
                            fields.length > 1 &&
                            <Box display="flex" justifyContent="flex-end">
                                <IconButton
                                    size='small'
                                    color="error"
                                    onClick={() => remove(index)}
                                >
                                    <Delete fontSize='small' />
                                </IconButton>
                            </Box>
                        }
                    </Stack>
                    <Controller
                        name={`content.${index}.title`}
                        control={control}
                        render={({ field, formState: { errors } }) => (
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                size='small'
                                margin="normal"
                                error={!!errors.content?.[index]?.title}
                                helperText={errors.content?.[index]?.title?.message}
                            />
                        )}
                    />
                    <Controller
                        name={`content.${index}.time`}
                        control={control}
                        render={({ field, formState: { errors } }) => (
                            <TextField
                                type="datetime-local"
                                {...field}
                                label="Time"
                                fullWidth
                                size='small'
                                margin="normal"
                                error={!!errors.content?.[index]?.time}
                                helperText={errors.content?.[index]?.time?.message}
                                sx={{
                                    '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
                                        filter: calendarIconFilter,
                                    },
                                }}
                            />
                        )}
                    />
                    <Controller
                        name={`content.${index}.description`}
                        control={control}
                        render={({ field, formState: { errors } }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                size='small'
                                margin="normal"
                                error={!!errors.content?.[index]?.description}
                                helperText={errors.content?.[index]?.description?.message}
                            />
                        )}
                    />
                </Box>
            ))}
            <Button
                variant="contained"
                fullWidth
                onClick={handleAddContent}
                sx={{ mb: 1 }}
            >
                Add Content
            </Button>
            <Stack direction="row" spacing={1}>
                {fields.map((field, index) => (
                    <Button
                        size='small'
                        key={`btn-${field.id}`}
                        onClick={() => setCounter(index)}
                        variant={index === counter ? "contained" : "outlined"}
                    >
                        Content {index + 1}
                    </Button>
                ))}
            </Stack>
        </Box>
    )
}

export default CourseContent