import React from 'react';
import {
  Skeleton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from '@mui/material';

interface ShowSkeletonProps {
  viewType: 'card' | 'table';
  columnCount?: number;
  cardCount?: number;
}

const ShowSkeleton: React.FC<ShowSkeletonProps> = ({ viewType, columnCount = 4, cardCount=6 }) => {
  const theme = useTheme();

  const skeletonBaseColor =
    theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200];

  const skeletonHighlightColor =
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100];

  if (viewType === 'card') {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: cardCount }).map((_, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              animation="wave"
              sx={{
                bgcolor: skeletonBaseColor,
                '&::after': {
                  background: `linear-gradient(90deg, ${skeletonBaseColor} 0%, ${skeletonHighlightColor} 50%, ${skeletonBaseColor} 100%)`,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: theme.palette.background.paper,
        '& .MuiTableHead-root': {
          backgroundColor: skeletonBaseColor,
        },
        '& th, & td': {
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow >
            {Array.from({ length: columnCount }).map((_, idx) => (
              <TableCell sx={{bgcolor:'background.paper', border: 'none'}} key={idx}>
                <Skeleton
                  width="50%"
                  animation="wave"
                  sx={{
                    bgcolor: skeletonBaseColor,
                    '&::after': {
                      background: `linear-gradient(90deg, ${skeletonBaseColor} 0%, ${skeletonHighlightColor} 50%, ${skeletonBaseColor} 100%)`,
                    },
                  }}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columnCount }).map((_, colIdx) => (
                <TableCell key={colIdx} sx={{border: 'none'}}>
                  <Skeleton
                    width="80%"
                    animation="wave"
                    sx={{
                      bgcolor: skeletonBaseColor,
                      '&::after': {
                        background: `linear-gradient(90deg, ${skeletonBaseColor} 0%, ${skeletonHighlightColor} 50%, ${skeletonBaseColor} 100%)`,
                      },
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowSkeleton;
