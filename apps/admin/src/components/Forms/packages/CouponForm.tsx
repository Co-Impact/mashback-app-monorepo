import React, { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, TextField, Typography, MenuItem, useTheme, FormControlLabel, Switch, Stack, IconButton, Tooltip } from '@mui/material';
import { useModal } from '../../../hooks/useModal';
import { usePostCoupon } from '../../../api/couponRequest/postCoupon';
import { useQueryClient } from '@tanstack/react-query';
import { DefaultCouponVal } from '../../../pages/Package/PackagePage';
import { Refresh, FileCopy } from '@mui/icons-material'; // Import the icons



const schema = yup.object({
    name: yup.string().required('Name is required'),
    code: yup.string().required('Code is required'),
    type: yup.string().oneOf(['PERCENTAGE', 'FIXED', 'FREE_MONTHS']).optional(),
    discount: yup.number().typeError('Discount must be a number').positive('Must be positive').required('Discount is required'),
    usageCount: yup.number().typeError('Usage count must be a number').positive('Must be positive').required('Discount is required'),
    maxUses: yup.number().typeError('Max count must be a number').positive('Must be positive').optional(),
    freeMonths: yup.number().typeError('Free months must be a number').positive('Must be positive').optional(),
    expiresAt: yup.string().required('Expired date is required'),
    isActive: yup.boolean(),
});

interface CouponFormProps {
    defaultVal: DefaultCouponVal;
    onEditSuccess: () => void;
}
export type CouponFormValues = yup.InferType<typeof schema>

const CouponForm: FC<CouponFormProps> = ({ defaultVal, onEditSuccess }) => {
    const { Modal, isOpen, open, close } = useModal();
    const [copyTooltip, setCopyTooltip] = useState('Copy code')
    const [regeneraeTooltip, setRegenerateTooltip] = useState('Regenerate code')
    const theme = useTheme();
    const postCoupon = usePostCoupon();
    const queryClient = useQueryClient()

    const calendarIconFilter =
        theme.palette.mode === 'dark'
            ? 'invert(100%)'
            : 'invert(0%)';

    const { control, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm<CouponFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            code: '',
            type: 'PERCENTAGE',
            discount: 0,
            maxUses: 0,
            expiresAt: '',
            usageCount: 1,
            isActive: true,
            freeMonths: 0,
        },
    });

    const handleRegenerateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        console.log({code})
        setValue('code', code)
        setRegenerateTooltip('Success ✓')
        setTimeout(() => {
            setRegenerateTooltip('Regenerate code')
        }, 2000)
        // Implement your regenerate functionality here
    };

    const handleCopyCode = async () => {
        console.log('Copy action triggered');
        await navigator.clipboard.writeText(getValues('code'))
        setCopyTooltip('Success ✓')
        setTimeout(() => {
            setCopyTooltip('Copy code')
        }, 2000)
    };

    useEffect(()=>{
        if(defaultVal || !isOpen) return ;
        handleRegenerateCode()
    },[isOpen])

    useEffect(() => {

        if (defaultVal) {
            open()
            reset({
                name: defaultVal?.name || '',
                code: defaultVal?.code || '',
                type: defaultVal?.type || 'PERCENTAGE',
                discount: defaultVal?.discount || 0,
                maxUses: defaultVal?.maxUses || 0,
                expiresAt: defaultVal?.expiresAt || '',
                usageCount: defaultVal?.usageCount || 1,
                isActive: defaultVal?.isActive || true,
                freeMonths: defaultVal?.freeMonths || 0,
            });
        }

    }, [defaultVal])

    const onSubmit = async (data: CouponFormValues) => {
        try {
            const payload = { ...data }
            payload['expiresAt'] = new Date(data.expiresAt) as any
            if (!defaultVal) {
                await postCoupon.mutateAsync(payload)
            } else {
                // TODO Edit coupon api inegration
            }
            queryClient.refetchQueries({ queryKey: ["coupons"] })
            reset();
            close();
        } catch (err) {
            console.log('Error creating coupon: ', err)
        }
    };

    function handleOpen() {
        onEditSuccess()
        reset({
            name: '',
            code: '',
            type: 'PERCENTAGE',
            discount: 0,
            maxUses: 0,
            expiresAt: '',
            usageCount: 1,
            isActive: true,
            freeMonths: 0,
        });
        open();
    }

    return (
        <>
            <Button size="small" variant="contained" onClick={handleOpen} sx={{ ml: 1 }}>
                New Coupon
            </Button>
            <Modal showCloseIcon open={isOpen}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: '100%', mx: 'auto', p: 2, position: 'relative' }}>
                    <Typography variant="h6" mb={2}>Coupon Form</Typography>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
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
                    <Stack direction={'row'} spacing={2}>
                        <Controller
                            name="code"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Coupon code"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    InputProps={{ readOnly: true }}
                                    focused={false}
                                />
                            )}
                        />
                        <Tooltip title={regeneraeTooltip} arrow>
                            <IconButton
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'transparent', // Removes hover background
                                    },
                                }}
                                onClick={handleRegenerateCode}>
                                <Refresh />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={copyTooltip} arrow>
                            <IconButton
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'transparent', // Removes hover background
                                    },
                                }}
                                onClick={handleCopyCode}>
                                <FileCopy />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Coupon Type"
                                fullWidth
                                margin="normal"
                                error={!!errors.type}
                                helperText={errors.type?.message}
                            >
                                <MenuItem value="PERCENTAGE">PERCENTAGE</MenuItem>
                                <MenuItem value="FIXED">FIXED</MenuItem>
                                <MenuItem value="FREE_MONTHS">FREE MONTHS</MenuItem>
                            </TextField>
                        )}
                    />
                    <Controller
                        name="discount"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Discount Value"
                                fullWidth
                                margin="normal"
                                error={!!errors.discount}
                                helperText={errors.discount?.message}
                            />
                        )}
                    />
                    <Controller
                        name="maxUses"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Max Uses"
                                fullWidth
                                margin="normal"
                                error={!!errors.maxUses}
                                helperText={errors.maxUses?.message}
                            />
                        )}
                    />
                    <Controller
                        name="usageCount"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Usage Count"
                                fullWidth
                                margin="normal"
                                error={!!errors.usageCount}
                                helperText={errors.usageCount?.message}
                            />
                        )}
                    />
                    <Controller
                        name="freeMonths"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Free months"
                                fullWidth
                                margin="normal"
                                error={!!errors.freeMonths}
                                helperText={errors.freeMonths?.message}
                            />
                        )}
                    />
                    <Controller
                        name="isActive"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel control={<Switch {...field} checked={field.value} />} label="Active" />
                        )}
                    />
                    <Controller
                        name="expiresAt"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Expired Date"
                                type="date"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.expiresAt}
                                helperText={errors.expiresAt?.message}
                                sx={{
                                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                        filter: calendarIconFilter,
                                    },
                                }}
                            />
                        )}
                    />
                    <Button disabled={postCoupon.isPending} type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        {postCoupon.isPending ? 'Creating Coupon ...' : 'Submit'}
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default CouponForm;
