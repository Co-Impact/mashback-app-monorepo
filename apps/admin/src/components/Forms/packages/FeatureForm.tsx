import React from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Switch, TextField, Typography, FormControlLabel, IconButton, Stack } from '@mui/material';
import { useModal } from '../../../hooks/useModal';
import { usePostFeature } from '../../../api/featureRequest/postFeature';
import { Delete } from '@mui/icons-material';

export interface ISetting {
  name: string;
  isActive: boolean;
}

export interface FeatureFormValues {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  settings?: ISetting[];
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required(),
  price: yup.number().required('Price is required'),
  isActive: yup.boolean().required(),
  settings: yup.array().of(
    yup.object({
      name: yup.string().required('Tab name is required'),
      isActive: yup.boolean().required(),
    })
  ).min(1,'At least 1 setting is required'),
});

const FeatureForm = () => {
  const postFeature = usePostFeature();
  const { Modal, isOpen, open, close } = useModal();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FeatureFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      isActive: true,
      settings: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'settings',
  });

  const onSubmit = async (data: FeatureFormValues) => {
    try {
      const payload = { ...data, settings: { settings: data?.settings } }
      console.log(payload);
      await postFeature.mutateAsync(payload)
      reset();
      close();
    } catch (err) {
      console.log('Error creating coupon: ', err)
    }
  };

  return (
    <>
      <Button size="small" variant="contained" onClick={open}>
        New Feature
      </Button>
      <Modal showCloseIcon open={isOpen}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto', p: 2, position: 'relative' }}>
          <Typography variant="h6" mb={2}>Feature Form</Typography>
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
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
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
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} checked={field.value} />}
                label="Active"
              />
            )}
          />
          <Controller
            name="settings"
            control={control}
            render={() => (
              <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Settings</Typography>
                {fields.map((field, idx) => (
                  <Stack direction={'row'} key={field.id} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                      <Controller
                        name={`settings.${idx}.name`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Tab Name"
                            size="small"
                            error={!!errors.settings?.[idx]?.name}
                            helperText={errors.settings?.[idx]?.name?.message}
                          />
                        )}
                      />
                      <Controller
                        name={`settings.${idx}.isActive`}
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<Switch {...field} checked={!!field.value} />}
                            label="Active"
                          />
                        )}
                      />
                    </Stack>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => remove(idx)}
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                ))}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => append({ name: '', isActive: false })}
                  sx={{ mt: 1 }}
                >
                  Add Setting
                </Button>
                <Typography variant="caption" color="error">
                  {errors?.settings?.message}
                </Typography>
              </Stack>
            )}
          />
          <Button disabled={postFeature.isPending} type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {postFeature.isPending ? 'Creating Feature...' : 'Submit'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FeatureForm;