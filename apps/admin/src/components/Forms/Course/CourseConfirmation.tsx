import { FC } from 'react'
import { CourseFormValues } from '../../Dialog/CourseDialog'
import { Box, Typography } from '@mui/material';

interface CourseConfirmationProps {
    getValues: () => CourseFormValues;
}

const CourseConfirmation: FC<CourseConfirmationProps> = ({ getValues }) => {
    const values = getValues()
    return (
        <Box>
            <Typography variant="h6">Course Information</Typography>
            <Typography><b>Name:</b> {values.name}</Typography>
            <Typography><b>Description:</b> {values.description}</Typography>
            <Typography><b>Price:</b> {values.price}</Typography>
            <Typography><b>Test:</b> {values.test ? "Yes" : "No"}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Content</Typography>
            {values.content?.map((item, idx) => (
                <Box key={idx} sx={{ pl: 2, mb: 1 }}>
                    <Typography><b>Title:</b> {item.title}</Typography>
                    <Typography><b>Time:</b> {item.time}</Typography>
                    <Typography><b>Description:</b> {item.description}</Typography>
                </Box>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>Configuration</Typography>
            <Typography><b>Certificate:</b> {values.certificate ? "Yes" : "No"}</Typography>
            <Typography><b>Labs:</b> {Array.isArray(values.labs) ? values.labs.join(", ") : values.labs}</Typography>
            <Typography><b>Points:</b> {values.points}</Typography>

        </Box>
    )
}

export default CourseConfirmation