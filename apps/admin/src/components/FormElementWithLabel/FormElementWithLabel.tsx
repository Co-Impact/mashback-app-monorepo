import { FC, ReactNode, isValidElement } from 'react';
import { Stack, Typography } from '@mui/material';

interface FormElementWithLabelProps {
  label: string;
  value: string | undefined | null | ReactNode;
  error?: boolean;
  direction?: 'row'|'column';
}

const FormElementWithLabel: FC<FormElementWithLabelProps> = ({ label, value, error=false, direction='column' }) => {
  // Early return for falsy values (null, undefined, empty string)
  if (value === null || value === undefined || value === '') {
    return (
      <Stack direction={direction} spacing={'4px'} width={'100%'}>
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body1">-</Typography>
      </Stack>
    );
  }

  // If value is a string or number, render inside <Typography>
  if (typeof value === 'string' || typeof value === 'number') {
    return (
      <Stack direction={direction} spacing={'4px'} width={'100%'}>
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body1">{value}</Typography>
      </Stack>
    );
  }

  // If value is a valid React element (JSX), render it directly
  if (isValidElement(value)) {
    return (
      <Stack alignItems={direction==='row'? 'center': 'start'} direction={direction} spacing={'4px'} width={'100%'}>
        <Typography variant="body1" sx={{ flexGrow: 1, color:  error ? 'error.main': 'text.primary', fontWeight: 600 }}>
          {label}
        </Typography>
        {value} {/* Render JSX directly */}
      </Stack>
    );
  }

  // Fallback case, which is just for safety
  return (
    <Stack spacing={'4px'} width={'100%'}>
      <Typography variant="body1" sx={{ color: 'text.primary' }}>
        {label}
      </Typography>
      <Typography variant="body1">-</Typography>
    </Stack>
  );
};

export { FormElementWithLabel };
