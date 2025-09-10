import React, { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NewsSource } from './types';
import { toast } from 'react-toastify';
import { useUpdateNews } from '../../../api/newsRequest/updateNews';
import { useCreateNews } from '../../../api/newsRequest/createNews';
import { isRSSFeed } from './helper';
import { Check, CheckCircle, Error } from '@mui/icons-material';
import { useQueryClient } from '@tanstack/react-query';


const schema = yup.object({
  website: yup.string().url('Enter a valid url').required('Website URL is required'),

  feedUrl: yup
    .string()
    .url('Enter a valid URL')
    .required('Feed URL is required')
    .test(
      'is-rss-feed',
      'Please enter a valid RSS feed URL',
      async (value) => {
        if (!value) return false;
        return await isRSSFeed(value);
      }
    ),
  name: yup.string().required("Name is required"),
});

type FormValues = yup.InferType<typeof schema>;

interface NewsFormProps {
  onActionPerformed: () => void;
  selectedSource: NewsSource | null
}

const NewsForm: React.FC<NewsFormProps> = ({ onActionPerformed, selectedSource }) => {
  const createNews = useCreateNews()
  const updateNews = useUpdateNews()
  const queryClient = useQueryClient()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      website: '',
      feedUrl: '',
    },
    mode: 'onTouched'
  });

  useEffect(() => {
    if (!selectedSource) {
      reset()
      return
    }

    reset({
      feedUrl: selectedSource.feedUrl || '',
      name: selectedSource.name || '',
      website: selectedSource.website || '',
    })

  }, [selectedSource])


  const onSubmit = async (data: FormValues) => {

    if (selectedSource) {
      await updateNews.mutateAsync({ ...data, id: selectedSource.id })
    } else {
      await createNews.mutateAsync(data)
    }
    queryClient.refetchQueries({queryKey: ['news']})
    onActionPerformed()
  };

  return (
    <Box sx={{ maxWidth: '100%', }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="website"
          control={control}
          render={({ field }) => (
            <TextField
              label="Website URL"
              fullWidth
              margin="normal"
              error={!!errors.website}
              helperText={errors.website?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="feedUrl"
          control={control}
          render={({ field, fieldState: { isValidating, invalid, isTouched, isDirty } }) => (
            <TextField
              label="Feed URL"
              fullWidth
              margin="normal"
              error={!!errors.feedUrl}
              helperText={errors.feedUrl?.message}
              InputProps={{
                endAdornment: (
                  isTouched && isDirty && (isValidating || invalid || !invalid) ? (
                    <InputAdornment position="end">
                      {isValidating ? (
                        <CircularProgress size={24} />
                      ) : invalid ? (
                        <Error color="error" />
                      ) : (
                        <CheckCircle color="success" />
                      )}
                    </InputAdornment>
                  ) : null
                ),
              }}
              {...field}
            />
          )}
        />

        {/* Submit Button */}
        <Button disabled={createNews.isPending || updateNews.isPending} type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {selectedSource ? updateNews.isPending ? 'Updating News...' : 'Update News' : createNews.isPending ? 'Creating News...' : 'Create News'}
        </Button>
      </form>
    </Box>
  );
};

export default NewsForm;
