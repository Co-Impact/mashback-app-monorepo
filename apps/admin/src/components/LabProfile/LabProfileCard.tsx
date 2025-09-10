import React, { useState } from 'react';
import {
    Box,
    Avatar,
    CardMedia,
    Typography,
    Chip,
    Stack,
    IconButton,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useModal } from '../../hooks/useModal';
import FileUpload from '../Forms/FileUpload';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUpdateLab } from '../../api/labsRequest/postLabs';
import { useQueryClient } from '@tanstack/react-query';



const schema = yup.object().shape({
    file: yup
        .mixed<File>()
        .required("File is required")
        .test("fileType", "Only images are allowed", (value) =>
            value ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type) : false
        )
        .test("fileSize", "File size must be less than 2MB", (value) =>
            value ? value.size <= 2 * 1024 * 1024 : false
        ),
});

type FormValues = yup.InferType<typeof schema>;


type EditType = 'cover' | 'profile'

interface ProfileCardProps {
    background: string;
    labImage: string;
    labId: string;
    name: string;
    difficult: string;
    isActive: boolean;
}


const ProfileCard: React.FC<ProfileCardProps> = ({
    background,
    labImage,
    name,
    difficult,
    isActive,
    labId
}) => {
    const [isBgHovered, setIsBgHovered] = useState(false);
    const [isAvatarHovered, setIsAvatarHovered] = useState(false);
    const { Modal, close, isOpen, open } = useModal()
    const queryClient = useQueryClient()
    const updateLabs = useUpdateLab()
    const [editType, setEditType] = useState<EditType | null>(null)
    const methods = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            file: undefined,
        },
    });
    const handleEditClick = (editType: EditType) => {
        setEditType(editType)
        open()
        methods.reset()
    }

    const onSubmit = async (data: FormValues) => {
        const payload = new FormData()
        payload.append('type', editType!)
        payload.append('file', data.file)

        await updateLabs.mutateAsync({ id: labId, data: payload })
        queryClient.refetchQueries({ queryKey: ['labs', labId] })
        methods.reset()
        close()
    };

    return (
        <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
            {/* Background image with hover detection */}
            <Box
                sx={{ position: 'relative' }}
                onMouseEnter={() => setIsBgHovered(true)}
                onMouseLeave={() => setIsBgHovered(false)}
            >
                <CardMedia
                    component="img"
                    height="200"
                    image={background}
                    alt="Background"
                />
                {isBgHovered && (
                    <IconButton
                        onClick={() => handleEditClick('cover')}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            },
                        }}
                        size="small"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>

            {/* Overlay with profile info */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.4)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'end',
                    px: 3,
                    gap: 2,
                    pointerEvents: 'none', // allow background hover to work
                }}
            >
                <Stack direction="row" alignItems="center" mb={2} spacing={2}>
                    {/* Avatar with hover detection */}
                    <Box
                        sx={{
                            position: 'relative',
                            width: 72,
                            height: 72,
                            pointerEvents: 'auto', // re-enable pointer events for this box
                        }}
                        onMouseEnter={() => setIsAvatarHovered(true)}
                        onMouseLeave={() => setIsAvatarHovered(false)}
                    >
                        <Avatar
                            src={labImage}
                            sx={{
                                width: 72,
                                height: 72,
                                border: '2px solid white',
                            }}
                        />
                        {isAvatarHovered && (
                            <IconButton
                                onClick={() => handleEditClick('profile')}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    },
                                }}
                                size="small"
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>

                    {/* Text and status */}
                    <Box sx={{ pointerEvents: 'auto' }}>
                        <Typography variant="h5" fontWeight="bold">
                            {name}
                        </Typography>
                        <Typography variant="subtitle1">Level: {difficult}</Typography>
                        <Chip
                            label={isActive ? 'Active' : 'Inactive'}
                            color={isActive ? 'success' : 'default'}
                            size="small"
                            sx={{ mt: 1 }}
                        />
                    </Box>
                </Stack>
            </Box>
            {
                isOpen &&
                <Modal title={editType === 'cover' ? 'Update Lab Cover Image' : 'Update Lab Profile Image'} open={isOpen} showCloseIcon>
                    <FormProvider {...methods}>
                        <form style={{ width: '100%' }} onSubmit={methods.handleSubmit(onSubmit)}>
                            <FileUpload name="file" initialUrl={(editType === 'cover' ? background : labImage) ?? ''} />
                            <div style={{ display: 'flex' }}>
                                <Button variant='contained' sx={{ mt: 2, marginLeft: 'auto' }} type="submit">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </Modal>
            }
        </Box>
    );
};

export default ProfileCard;
