import { Add, Edit } from '@mui/icons-material'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { ILab } from '../../api/types'
import { FC } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useModal } from '../../hooks/useModal';
import VisualDiagramMaker from '../../pages/CTF/VisualDiagramMaker';

const schema = yup.object({
    diagram: yup.mixed(),
});

export type FormValues = yup.InferType<typeof schema>;


interface ManageDiagramProps {
    data: ILab
}
const ManageDiagram: FC<ManageDiagramProps> = ({ data }) => {
    const {Modal, open, isOpen, close} =  useModal()
    function handleEditDiagram() { 
        open()
    }
    function handleCreateDiagram() { 
        open()
    }


    const {
        setValue,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            diagram: null
        },
    });

    return (
        <Stack borderRadius={2} spacing={3} sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ color: 'text.primary', fontWeight: 600 }} variant="h6" gutterBottom>
                    Diagram
                </Typography>
                {
                    data?.diagram ?
                        <Button variant="contained" endIcon={<Edit fontSize="small" />} onClick={handleEditDiagram}>
                            Edit
                        </Button>
                        :
                        <Button variant="contained" endIcon={<Add fontSize="small" />} onClick={handleCreateDiagram}>
                            Add
                        </Button>
                }
            </Stack>
            <Divider />
                <Modal maxWidth='lg' open={isOpen}  showCloseIcon title='Diagram'>
                    <VisualDiagramMaker close={close} setValue={setValue} />
                </Modal>
        </Stack>
    )
}

export default ManageDiagram