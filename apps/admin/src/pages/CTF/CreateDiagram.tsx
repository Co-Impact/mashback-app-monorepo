import React, { FC } from 'react'
import { useModal } from '../../hooks/useModal'
import { Button } from '@mui/material'
import VisualDiagramMaker from './VisualDiagramMaker'
import { UseFormSetValue } from 'react-hook-form'
import { CreateCTF } from '../../api/types'

interface CreateDiagramProps {
    setValue: UseFormSetValue<CreateCTF>
}

const CreateDiagram: FC<CreateDiagramProps> = ({setValue}) => {
    const { Modal, isOpen, open, close } = useModal()
    return (
        <>
            <Button onClick={open} variant='contained'>Create Diagram</Button>
            <Modal title='Create Diagram' showCloseIcon maxWidth='lg' open={isOpen}>
                <VisualDiagramMaker close={close} setValue={setValue} />
            </Modal>
        </>
    )
}

export default CreateDiagram