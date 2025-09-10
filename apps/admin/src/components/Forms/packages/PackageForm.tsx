import React, { useMemo, FC, useEffect } from 'react';
import { useForm, Controller, useFieldArray, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  ListItem,
  List,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetAllFeatures } from '../../../api/featureRequest/getFeatures';
import { useCreatePackage } from '../../../api/packageRequest/postPackage';
import { useQueryClient } from '@tanstack/react-query';
import { IPackages } from '../../../api/types';

const initialValue = {
      coupons: [],
      courses: [],
      features: [],
      isActive: false,
      isBasePackage: false,
      planName: ''
    }
export interface PackageFormValues {
  planName: string;
  isActive: boolean;
  isBasePackage: boolean;
  features: string[];
  coupons: string[];
  courses: string[];
}

const schema: yup.ObjectSchema<PackageFormValues> = yup.object({
  planName: yup.string().required('Plan name is required'),
  isActive: yup.boolean().required(),
  isBasePackage: yup.boolean().required(),
  features: yup.array(yup.string().required()).min(1, 'Select at least one sub-feature').required(),
  coupons: yup.array().of(yup.string().required()).required(),
  courses: yup.array().of(yup.string().required()).required(),
});

interface PackageFormProps {
  close: () => void;
  defaultPackageFormValue: IPackages|null;
}

const PackageForm: FC<PackageFormProps> = ({ close, defaultPackageFormValue }) => {
  const featuresData = useGetAllFeatures()
  const queryClient = useQueryClient()
  const createPackage = useCreatePackage()
  const featureSelect = useMemo(
    () => {

      return featuresData.data?.map(feature => {
        return {
          id: feature.id,
          name: feature.name,
          price: feature.price,
          children: feature?.settings?.settings
            .filter((setting) => setting.isActive)
            .map((setting, idx) => ({
              id: `${feature.id}@${idx + 1}`,
              name: setting.name,
            })) || []
        }
      }) || []
    },
    [featuresData.data]
  );

  const couponSelect = useMemo(
    () => [
      { id: 'c1', name: '10% Off' },
      { id: 'c2', name: '20% Off' },
      { id: 'c3', name: '50 INR Off' },
    ],
    []
  );

  const courseSelect = useMemo(
    () => [
      { id: '1', name: 'Course 1' },
      { id: '2', name: 'Course 2' },
      { id: '3', name: 'Course 3' },
    ],
    []
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PackageFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  

  const features = useWatch({ control, name: 'features' });
  const coupons = useWatch({ control, name: 'coupons' });
  const courses = useWatch({ control, name: 'courses' });

  const getFeatureDetails = () => {
    return featureSelect.map((feature) => {
      const selectedSubfeatures = feature.children.filter((subfeature) =>
        features?.includes(subfeature.id)
      );
      return {
        featureName: feature.name,
        subfeatures: selectedSubfeatures,
        price: selectedSubfeatures.length > 0 ? feature.price : 0,
      };
    });
  };

  const totalFeaturePrice = getFeatureDetails().reduce(
    (sum, f) => sum + f.price,
    0
  );
  const totalDiscount = totalFeaturePrice * 0.1;
  const discountedPrice = totalFeaturePrice - totalDiscount;

  const getCouponNames = () =>
    coupons?.map((couponId) => {
      const coupon = couponSelect.find((c) => c.id === couponId);
      return coupon ? coupon.name : '';
    }).join(', ') || '';

  const getCourseNames = () =>
    courses?.map((courseId) => {
      const course = courseSelect.find((c) => c.id === courseId);
      return course ? course.name : '';
    }).join(', ') || '';

  const onSubmit = async (data: PackageFormValues) => {
    const settings = featureSelect.reduce((acc, feature) => {
      const featureEntry = feature.children.map((child) => ({
        name: child.name,
        value: data.features.includes(child.id),
      }));
      acc[feature.id] = featureEntry;
      return acc;
    }, {} as Record<string, { name: string; value: boolean }[]>);
    // Step 1: Split each ID at "@" and keep only the base ID
    const baseIds = data.features.map(id => id.split('@')[0]);

    // Step 2: Create a Set to get unique base IDs
    const featureIds = [...new Set(baseIds)];

    const payload = { name: data.planName, price: totalFeaturePrice, isActive: data.isActive, settings: settings, features:featureIds, isBasePackage: data.isBasePackage }
    try {
      await createPackage.mutateAsync(payload)
      queryClient.refetchQueries({ queryKey: ["package"] })
      reset()
      close()
    } catch (err) {
      console.log('error creating package: ', err)
    }

  };

  useEffect(()=>{
    if(!defaultPackageFormValue || !featureSelect.length) return ;
    const selected:string[] = []
    featureSelect.forEach(feat=>{
      const selectedSettings = defaultPackageFormValue?.settings?.[feat.id]?.filter(item=>item.value)
      selectedSettings?.forEach(ss=>{
        const selectedFeat = feat.children.find(item=>item.name===ss.name)
        if(selectedFeat){
          selected.push(selectedFeat.id)
        }
      })
    })
    reset({
      features: selected,
      planName: defaultPackageFormValue.name,
      coupons: [],
      courses: [],
      isActive: defaultPackageFormValue.isActive,
      isBasePackage: defaultPackageFormValue.isBasePackage
    })

  },[featureSelect, defaultPackageFormValue])



  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>Create Package</Typography>
      <Grid container spacing={4}>
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Controller
              name="planName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Plan Name"
                  fullWidth
                  error={!!errors.planName}
                  helperText={errors.planName?.message}
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
              name="isBasePackage"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Switch {...field} checked={field.value} />} label="Base Package" />
              )}
            />

            {/* Features Section */}
            <Controller
              name="features"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormControl error={!!errors.features}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Features</Typography>
                  <Box>
                    {featureSelect.map((feature) => {
                      const childIds = feature.children.map(c => c.id);
                      const allSelected = childIds.every(id => value.includes(id));
                      const someSelected = childIds.some(id => value.includes(id));

                      return (
                        <Accordion key={feature.id}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={allSelected}
                                  indeterminate={!allSelected && someSelected}
                                  onChange={(e, checked) => {
                                    const updated = checked
                                      ? [...new Set([...value, ...childIds])]
                                      : value.filter(id => !childIds.includes(id));
                                    onChange(updated);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                />
                              }
                              label={`${feature.name} (₹${feature.price})`}
                              onClick={(e) => e.stopPropagation()}
                              onFocus={(e) => e.stopPropagation()}
                            />
                          </AccordionSummary>
                          <AccordionDetails>
                            <FormGroup sx={{ pl: 2 }}>
                              {feature.children.map((child) => (
                                <FormControlLabel
                                  key={child.id}
                                  control={
                                    <Checkbox
                                      checked={value.includes(child.id)}
                                      onChange={(e, checked) => {
                                        let updated = [...value];
                                        if (checked) {
                                          updated.push(child.id);
                                        } else {
                                          updated = updated.filter(id => id !== child.id);
                                        }
                                        onChange(updated);
                                      }}
                                    />
                                  }
                                  label={child.name}
                                />
                              ))}
                            </FormGroup>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </Box>
                  <Typography variant="caption" color="error">
                    {errors.features?.message}
                  </Typography>
                </FormControl>
              )}
            />

            {/* Courses */}
            <Controller
              name="courses"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Courses</InputLabel>
                  <Select
                    multiple
                    {...field}
                    input={<OutlinedInput label="Courses" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((id) => {
                          const course = courseSelect.find((c) => c.id === id);
                          return <Chip key={id} label={course?.name || id} />;
                        })}
                      </Box>
                    )}
                  >
                    {courseSelect.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            {/* Coupons */}
            <Controller
              name="coupons"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Coupons</InputLabel>
                  <Select
                    multiple
                    {...field}
                    input={<OutlinedInput label="Coupons" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((id) => {
                          const coupon = couponSelect.find((c) => c.id === id);
                          return <Chip key={id} label={coupon?.name || id} />;
                        })}
                      </Box>
                    )}
                  >
                    {couponSelect.map((coupon) => (
                      <MenuItem key={coupon.id} value={coupon.id}>
                        {coupon.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Button disabled={createPackage.isPending} type="submit" variant="contained">
              {createPackage.isPending ? 'Creating Package...' : 'Submit'}
            </Button>
          </Stack>
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 0, p: 2, borderRadius: 2 }}>
            <Typography variant="h6">Summary</Typography>
            <Box ml={1}>
              <List>
                {getFeatureDetails().map((f, i) => (
                  f.subfeatures.length > 0 && (
                    <Box key={i}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">{f.featureName} ({f.subfeatures.length})</Typography>
                        <Typography variant="subtitle2">Price: ₹{f.price}</Typography>
                      </Stack>
                      <Stack spacing={1} ml={2} my={1}>
                        {f.subfeatures.map((s) => (
                          <Typography key={s.name} variant="body2">{s.name}</Typography>
                        ))}
                      </Stack>
                      <Divider />
                    </Box>
                  )
                ))}
              </List>
              <Typography variant="subtitle1">Coupons: {getCouponNames()}</Typography>
              <Typography variant="subtitle1">Courses: {getCourseNames()}</Typography>
            </Box>
            <Box position={'sticky'} bottom={-20} sx={{ backgroundColor: theme => theme.palette.mode === 'dark' ? '#424242' : '#ffffff', py: '8px' }}>
              <Box bgcolor="background.default" p={2} borderRadius={2}>
                <Typography>Total Price: ₹{totalFeaturePrice}</Typography>
                <Typography>Discount: ₹{totalDiscount}</Typography>
                <Typography>Discounted Price: ₹{discountedPrice}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PackageForm;
