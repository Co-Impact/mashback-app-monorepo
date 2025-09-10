// hooks/useModal.tsx
import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogProps,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps extends DialogProps {
  children: React.ReactNode;
  title?: string;
  showCloseIcon?: boolean;
}

interface UseModalReturn {
  Modal: React.FC<ModalProps>;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const Modal: React.FC<ModalProps> = ({
    children,
    title,
    showCloseIcon = false,
    maxWidth = 'sm',
    fullWidth = true,
    keepMounted = true,
    TransitionComponent = undefined,
    transitionDuration = 0,
    ...dialogProps
  }) => {
    const { open: _open, ...restDialogProps } = dialogProps;
    return (
      <Dialog
        onClose={close}
        open={isOpen}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        keepMounted={keepMounted}
        TransitionComponent={TransitionComponent}
        transitionDuration={transitionDuration}
        {...restDialogProps}
      >
        {title ? (
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {title}
            {showCloseIcon && (
              <IconButton onClick={close}>
                <CloseIcon />
              </IconButton>
            )}
          </DialogTitle>
        ) : showCloseIcon ? (
          <Box sx={{ p: 1, position: 'absolute', right: 0 }}>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </Box>
        ) : null}

        <DialogContent
          sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
              background: theme => theme.palette.grey[400]
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555',
            },
          }}
        >{children}
        </DialogContent>
      </Dialog>
    );
  };

  return { Modal, open, close, isOpen };
};
