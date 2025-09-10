import { styled } from '@mui/system';
import {Button, Stack} from '@mui/material';

export const StyledCellContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1), 
}));


export const StyledViewDetailsButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'background-color 0.3s, color 0.3s',

  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#eee',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
}));

