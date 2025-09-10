import React from 'react'
import { useModal } from '../../hooks/useModal'
import { Button, Typography } from '@mui/material'

const CreateReportDialog = () => {
    const {Modal, isOpen, open} = useModal()
  return (
    <>
        <Button variant='contained' onClick={open}>Create Report</Button>
        <Modal showCloseIcon title='Create Report' open={isOpen}>
            <Typography variant='h5'>Comming soon</Typography>
        </Modal>
    </>
  )
}

export default CreateReportDialog