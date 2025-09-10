import { Container, Skeleton, Stack } from "@mui/material"

const UserProfileSkeleton = () => {
    return (
        <Container>
            <Stack direction={'row'} spacing={4}>
                <Skeleton variant="rectangular" height={'300px'} width='30%' />
                <Skeleton variant="rectangular" height={'500px'} width='70%' />
            </Stack>
        </Container>
    )
}

export default UserProfileSkeleton