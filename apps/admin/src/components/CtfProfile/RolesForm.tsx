import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Grid, TextField, Typography, MenuItem, Switch, FormControlLabel, useTheme, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Involve, Difficulty, IPrize } from '../../api/types';

// Fix: Use correct type for useForm and useFieldArray, and ensure prizes is always string[]

// Fix: Ensure all fields are present in schema and required
const schema: yup.ObjectSchema<RolesFormValues> = yup.object({
  prizes: yup.array().of(
    yup.object({
      title: yup.string().required('Title is required'),
      description: yup.string().required('Description is required'),
      amount: yup.number().min(0, 'Amount must be at least 0').required('Amount is required'),
    })
  ).min(1, 'At least one prize is required').required(),
  involve: yup.mixed<Involve>().oneOf(Object.values(Involve)).required('Involve is required'),
  requiredPoints: yup.number().min(0).default(0).required('Required Points is required'),
  reqiresRegistration: yup.boolean().default(true).required('Required'),
  difficulty: yup.mixed<Difficulty>().oneOf(Object.values(Difficulty)).required('Difficulty is required'),
});

export type RolesFormValues = {
  prizes: IPrize[];
  involve: Involve;
  requiredPoints: number;
  reqiresRegistration: boolean;
  difficulty: Difficulty;
};

const defaultValues: RolesFormValues = {
  prizes: [{ title: '', description: '', amount: 0 }],
  involve: Involve.TEAM,
  requiredPoints: 0,
  reqiresRegistration: true,
  difficulty: Difficulty.EASY,
};

export const RolesForm: React.FC<{ onSubmit?: (data: RolesFormValues) => void; initialValues?: Partial<RolesFormValues> }> = ({ onSubmit, initialValues }) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RolesFormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: { ...defaultValues, ...initialValues },
    mode: 'onTouched',
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'prizes' });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit as any)} sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color={theme.palette.text.primary} gutterBottom>
            Prizes
          </Typography>
          {fields.map((field, idx) => (
            <Box key={field.id} display="flex" alignItems="center" mb={1} gap={1}>
              <Controller
                name={`prizes.${idx}.title` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    variant="outlined"
                    label={`Title`}
                    error={!!errors.prizes?.[idx]?.title}
                    helperText={errors.prizes?.[idx]?.title?.message}
                    sx={{ flex: 1 }}
                  />
                )}
              />
              <Controller
                name={`prizes.${idx}.description` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    variant="outlined"
                    label={`Description`}
                    error={!!errors.prizes?.[idx]?.description}
                    helperText={errors.prizes?.[idx]?.description?.message}
                    sx={{ flex: 2 }}
                  />
                )}
              />
              <Controller
                name={`prizes.${idx}.amount` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    size="small"
                    variant="outlined"
                    label={`Amount`}
                    error={!!errors.prizes?.[idx]?.amount}
                    helperText={errors.prizes?.[idx]?.amount?.message}
                    sx={{ width: 100 }}
                    inputProps={{ min: 0 }}
                  />
                )}
              />
              <IconButton aria-label="remove" onClick={() => remove(idx)} disabled={fields.length === 1}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              {idx === fields.length - 1 && (
                <IconButton aria-label="add" onClick={() => append({ title: '', description: '', amount: 0 })}>
                  <AddIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="involve"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                size="small"
                label="Involve"
                fullWidth
                variant="outlined"
                error={!!errors.involve}
                helperText={errors.involve?.message}
              >
                {Object.values(Involve).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                size="small"
                label="Difficulty"
                fullWidth
                variant="outlined"
                error={!!errors.difficulty}
                helperText={errors.difficulty?.message}
              >
                {Object.values(Difficulty).map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="requiredPoints"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                size="small"
                label="Required Points"
                fullWidth
                variant="outlined"
                error={!!errors.requiredPoints}
                helperText={errors.requiredPoints?.message}
                inputProps={{ min: 0 }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} display="flex" alignItems="center">
          <Controller
            name="reqiresRegistration"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} checked={field.value} color="primary" />}
                label={<Typography color={theme.palette.text.primary}>Requires Registration</Typography>}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
            Save Roles
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
