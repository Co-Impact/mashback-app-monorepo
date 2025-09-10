import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  IconButton,
  Box,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useModal } from '../../hooks/useModal';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Node } from 'reactflow';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  steps: yup.array().of(yup.string().required('Step cannot be empty')).min(1),
  buttonText: yup.string().required('Button Text is required'),
  iconFile: yup.mixed().nullable(),
  url: yup.string().url('Must be a valid URL').nullable(),
});

type TFormData = yup.InferType<typeof schema> & {id?: string};

const CreateNode = ({
  onCreate,
  initialData,
  isEditing = false,
  setEditingNode
}: {
  onCreate: (data: any) => void;
  initialData?: Partial<TFormData>;
  isEditing?: boolean;
  setEditingNode: React.Dispatch<React.SetStateAction<Node | null>>
}) => {
  const { Modal, isOpen, open, close } = useModal();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
  } = useForm<TFormData>({
    defaultValues: {
      title: 'ssdf',
      steps: ['df'],
      buttonText: 'sd',
      iconFile: null,
      url: 'https://google.com',
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'steps',
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (isEditing && initialData) {
      reset({
        title: initialData.title || '',
        steps: initialData.steps || [''],
        buttonText: initialData.buttonText || '',
        iconFile: null,
        url: initialData.url || '',
      });
      open();
    }
  }, [initialData, isEditing, open, reset]);

  const onSubmit = async (data: TFormData) => {
    
    let iconUrl: string | undefined = typeof data.iconFile === 'string' ? data.iconFile : undefined;

    if (data.iconFile && data.iconFile instanceof File) {
      // Convert image to base64
      iconUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(data.iconFile as File);
      });
    }

    const newNodeData = {
      id: isEditing && initialData?.id ? initialData.id : uuidv4(),
      ...data,
      icon: iconUrl,
    };

    onCreate(newNodeData);
    if (!isEditing) reset();
    close();
  };

  function handleCancle() {
    setEditingNode(null)
    close()
  }

  return (
    <>
      {/* {!isEditing && ( */}
        <Button onClick={open} variant="contained">
          Create Node
        </Button>
      {/* )} */}

      <Modal title={`${isEditing ? 'Edit' : 'Create'} Diagram Node`} maxWidth="xs" showCloseIcon open={isOpen} onClose={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={2}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Title" fullWidth required />
                )}
              />

              {fields.map((item, index) => (
                <Stack key={item.id} direction="row" spacing={1} alignItems="center">
                  <Controller
                    name={`steps.${index}`}
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label={`Step ${index + 1}`} fullWidth />
                    )}
                  />
                  <IconButton onClick={() => remove(index)} color="error">
                    <Delete />
                  </IconButton>
                </Stack>
              ))}
              <Box>
                <Button onClick={() => append('')} startIcon={<Add />} size="small">
                  Add Step
                </Button>
              </Box>

              <Controller
                name="buttonText"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Button Text" fullWidth required />
                )}
              />

              <Controller
                name="iconFile"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  />
                )}
              />

              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="URL (optional)" fullWidth />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancle}>Cancel</Button>
            <Button type="submit" variant="contained">
              {isEditing ? 'Update Node' : 'Add Node'}
            </Button>
          </DialogActions>
        </form>
      </Modal>
    </>
  );
};

export default CreateNode;
