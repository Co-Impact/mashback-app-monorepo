import React, { FC } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Box, useTheme, Typography } from '@mui/material';
import { CustomTooltipProps, GlobalAreaChartProps } from './types';

const CustomTooltip: FC<CustomTooltipProps> = ({
  active,
  payload,
  tooltipLabelPrefix = '',
}) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: '6px 12px',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="body2" color="text.primary">
          {`${tooltipLabelPrefix}#${payload[0].value}`}
        </Typography>
      </Box>
    );
  }

  return null;
};

const GlobalAreaChart: React.FC<GlobalAreaChartProps> = ({
  title = 'Local Ranking',
  data,
  dataKey = 'value',
  labelKey = 'key',
  tooltipLabelPrefix = 'Local ',
  height=300,
  color= '#1A73B6',
  header
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 2, borderRadius: 2 }}>
      {
        header ?
        header
        :
      <Typography variant="h6" mb={1} color="text.primary" gutterBottom>
        {title}
      </Typography>
      }
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>

          <defs>
            <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.68} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey={labelKey}
            stroke={theme.palette.text.disabled}
            tick={{ fill: theme.palette.text.primary }}
          />
          <YAxis
            orientation='right'
            stroke={theme.palette.text.disabled}
            tick={{ fill: theme.palette.text.primary }}
          />
          <Tooltip content={<CustomTooltip tooltipLabelPrefix={tooltipLabelPrefix} />} />

          <Area
            type="monotone"
            stroke={color}
            dataKey={dataKey}
            fill="url(#gradientColor)"
            dot={{ r: 3, strokeWidth: 2, fill: theme.palette.primary.main }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default GlobalAreaChart;
