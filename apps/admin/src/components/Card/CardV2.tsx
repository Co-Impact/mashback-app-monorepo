import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  SxProps,
  Theme,
  CardContentProps,
} from '@mui/material';

interface CardV2Props {
  elevation?: number;
  title: React.ReactNode;
  subheader?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactElement;
  titleTypographyProps?: React.ComponentProps<typeof Typography>;
  subheaderTypographyProps?: React.ComponentProps<typeof Typography>;
  descriptionTypographyProps?: React.ComponentProps<typeof Typography>;
  cardContentProps?: Partial<CardContentProps>;
  sx?: SxProps<Theme>;
}

const CardV2: React.FC<CardV2Props> = ({
  elevation = 3,
  title,
  subheader,
  description,
  icon,
  titleTypographyProps,
  subheaderTypographyProps,
  descriptionTypographyProps,
  cardContentProps,
  sx,
}) => {
  return (
    <Card elevation={elevation} sx={sx}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <Box>
          <Typography variant="h6" {...titleTypographyProps}>
            {title}
          </Typography>
          {subheader && (
            <Typography variant="subtitle2" {...subheaderTypographyProps}>
              {subheader}
            </Typography>
          )}
        </Box>
        {icon && <Box ml={2}>{icon}</Box>}
      </Box>

      {description && (
        <CardContent {...cardContentProps}>
          <Typography variant="body2" {...descriptionTypographyProps}>
            {description}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default CardV2;
