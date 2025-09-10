import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AwsRegion, AzureRegion, CloudProvider, LabServiceType } from './types';
import { useCreateRegion } from '../../../api/regionRequest/postRegion';
import { Region } from '../../../api/types';
import { useUpdateRegion } from '../../../api/regionRequest/updateRegion';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';


// Validation schema

const schema = yup.object({
  type: yup
    .mixed<LabServiceType>()
    .oneOf(Object.values(LabServiceType))
    .required(),

  cloudProvider: yup.string().required(),

  AWSRegion: yup.string().when('cloudProvider', (cloudProvider: any, schema) =>
    cloudProvider == CloudProvider.AWS
      ? schema.required('AWS Region is required')
      : schema.notRequired()
  ),

  AZURERegion: yup.string().when('cloudProvider', (cloudProvider: any, schema) =>
    cloudProvider == CloudProvider.AZURE
      ? schema.required('Azure Region is required')
      : schema.notRequired()
  ),

  network: yup.string().when('cloudProvider', (cloudProvider: any, schema) =>
    cloudProvider == CloudProvider.AWS
      ? schema.required('Network is required')
      : schema.notRequired()
  ),

  vnetName: yup.string().when('cloudProvider', (cloudProvider: any, schema) =>
    cloudProvider == CloudProvider.AZURE
      ? schema.required('VNet Name is required')
      : schema.notRequired()
  ),

  subnetName: yup.string().when('cloudProvider', (cloudProvider: any, schema) =>
    cloudProvider == CloudProvider.AZURE
      ? schema.required('Subnet Name is required')
      : schema.notRequired()
  ),

  securityGroupId: yup.string().when('cloudProvider', (cloudProvider: any, schema) =>
    cloudProvider == CloudProvider.AWS || cloudProvider == CloudProvider.AZURE
      ? schema.required('Security Group ID is required')
      : schema.notRequired()
  ),
});

type FormValues = yup.InferType<typeof schema>;

interface RegionFormProps {
  onActionPerformed: () => void;
  selectedRegion: Region | null
}

const RegionForm: React.FC<RegionFormProps> = ({ onActionPerformed, selectedRegion }) => {
  const createRegion = useCreateRegion()
  const updateRegion = useUpdateRegion()
  const queryClient = useQueryClient()
  const [cachedRegion, setCachedRegion] = React.useState<string[]>([]);

  const awsRegionCache = queryClient.getQueryData(['filter-region', { cloudProvider: CloudProvider.AWS }]) as Region[]
  const azureRegionCache = queryClient.getQueryData(['filter-region', { cloudProvider: CloudProvider.AZURE }])  as Region[]

  useEffect(() => {
    const data: string[] = []
    if(awsRegionCache?.length){
      awsRegionCache.forEach(item=>data.push(item.AWSRegion!))
    }
    if(azureRegionCache?.length){
      azureRegionCache.forEach(item=>data.push(item.AZURERegion!))
    }
    setCachedRegion(data)
  }, [awsRegionCache, azureRegionCache])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      type: LabServiceType.CTF,
      cloudProvider: CloudProvider.AWS,
      network: '',
      vnetName: '',
      subnetName: '',
      securityGroupId: '',
      AWSRegion: '',
      AZURERegion: '',
    },
  });

  useEffect(() => {
    if (!selectedRegion) {
      reset()
      return
    }

    reset({
      type: selectedRegion.type as LabServiceType,
      cloudProvider: selectedRegion.cloudProvider as CloudProvider.AWS,
      network: selectedRegion.network || '',
      vnetName: selectedRegion.vnetName || '',
      subnetName: selectedRegion.subnetName || '',
      securityGroupId: selectedRegion.securityGroupId,
      AWSRegion: selectedRegion.AWSRegion || '',
      AZURERegion: selectedRegion.AZURERegion || '',
    })

  }, [selectedRegion])

  const cloudProvider = useWatch({ control, name: 'cloudProvider' });

  const onSubmit = async (data: FormValues) => {
    const payload: any = { ...data }
    if (data.cloudProvider == CloudProvider.AWS) {
      payload['AZURERegion'] = null
      payload['vnetName'] = null
      payload['subnetName'] = null
    } else if (data.cloudProvider == CloudProvider.AZURE) {
      payload['AWSRegion'] = null
      payload['network'] = null
    }
    if (selectedRegion) {
      if (!selectedRegion?.id) {
        toast.error('Region ID is required')
        return
      }
      await updateRegion.mutateAsync({ ...payload, id: selectedRegion.id })
    } else {
      await createRegion.mutateAsync(payload)
    }
    if (selectedRegion?.cloudProvider === data.cloudProvider) {
      queryClient.refetchQueries({ queryKey: ['filter-region', { cloudProvider: data.cloudProvider }] })
    } else {
      queryClient.refetchQueries({ queryKey: ['filter-region', { cloudProvider: CloudProvider.AWS }] })
      queryClient.refetchQueries({ queryKey: ['filter-region', { cloudProvider: CloudProvider.AZURE }] })
    }
    onActionPerformed()
  };

  return (
    <Box sx={{ maxWidth: '100%', }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Type */}
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Type"
              fullWidth
              margin="normal"
              error={!!errors.type}
              helperText={errors.type?.message}
              {...field}
            >
              {Object.values(LabServiceType).map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Cloud Provider */}
        <Controller
          name="cloudProvider"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Cloud Provider"
              fullWidth
              margin="normal"
              error={!!errors.cloudProvider}
              helperText={errors.cloudProvider?.message}
              {...field}
            >
              {Object.values(CloudProvider).map((provider) => (
                <MenuItem key={provider} value={provider}>{provider}</MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* AWS Region */}
        {cloudProvider === CloudProvider.AWS && (
          <Controller
            name="AWSRegion"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth margin="normal" error={!!error}>
                <InputLabel sx={{ color: "text.primary" }}>AWS Region</InputLabel>
                <Select {...field} label="AWS Region">
                  {Object.entries(AwsRegion).filter(item=>!cachedRegion.includes(item[0])).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                {error && <Typography variant='body2' color={'error'}>{error.message}</Typography>}
              </FormControl>
            )}
          />
        )}

        {/* Azure Region */}
        {cloudProvider === CloudProvider.AZURE && (
          <Controller
            name="AZURERegion"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth margin="normal" error={!!error}>
                <InputLabel sx={{ color: "text.primary" }}>AZURE Region</InputLabel>
                <Select {...field} label="AZURE Region">
                  {Object.values(AzureRegion).filter(item=>!cachedRegion.includes(item)).map((region) => (
                    <MenuItem key={region} value={region}>{region}</MenuItem>
                  ))}
                </Select>
                {error && <Typography variant='body2' color={'error'}>{error.message}</Typography>}
              </FormControl>
            )}
          />
        )}


        {/* Network */}
        {
          cloudProvider === CloudProvider.AWS &&
          <Controller
            name="network"
            control={control}
            render={({ field }) => (
              <TextField
                label="Network"
                fullWidth
                margin="normal"
                error={!!errors.network}
                helperText={errors.network?.message}
                {...field}
              />
            )}
          />
        }

        {
          cloudProvider === CloudProvider.AZURE &&
          <>
            <Controller
              name="vnetName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Vnet Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.vnetName}
                  helperText={errors.vnetName?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="subnetName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Subnet Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.subnetName}
                  helperText={errors.subnetName?.message}
                  {...field}
                />
              )}
            />
          </>
        }

        {/* Security Group ID */}
        <Controller
          name="securityGroupId"
          control={control}
          render={({ field }) => (
            <TextField
              label="Security Group ID"
              fullWidth
              margin="normal"
              error={!!errors.securityGroupId}
              helperText={errors.securityGroupId?.message}
              {...field}
            />
          )}
        />

        {/* Submit Button */}
        <Button disabled={createRegion.isPending || updateRegion.isPending} type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {selectedRegion ? updateRegion.isPending ? 'Updating Region...' : 'Update Region' : createRegion.isPending ? 'Creating Region...' : 'Create Region'}
        </Button>
      </form>
    </Box>
  );
};

export default RegionForm;
