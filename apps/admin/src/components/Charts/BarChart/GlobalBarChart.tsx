import React, { FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import { CustomTooltipProps, GlobalBarChartProps } from './types';

// Custom Tooltip Component
const CustomTooltip: FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: 1,
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="subtitle2" color="text.primary">
          {label}
        </Typography>
        <Typography variant="body2">
          {`${payload[0].name}: ${payload[0].value.toLocaleString()}`}
        </Typography>
      </Box>
    );
  }

  return null;
};

const GlobalBarChart: React.FC<GlobalBarChartProps & {
  bars?: 'horizontal' | 'vertical',
  barColors?: string[] | ((index: number, data: any) => string),
  height?: number,
  showGrid?: boolean,
  barRadius?: [number, number, number, number],
}> = ({
  title = 'Global Ranking',
  data,
  highlightIndex = null,
  highlightColor = '#2196f3',
  dataKey = 'value',
  labelKey = 'month',
  bars = 'vertical',
  barColors,
  height = 300,
  showGrid = false,
  barRadius = [5, 5, 0, 0],
}) => {
  const theme = useTheme();
  const isHorizontal = bars === 'horizontal';

  const getBarColor = (index: number, d: any) => {
    if (index === highlightIndex) return highlightColor;
    if (typeof barColors === 'function') return barColors(index, d);
    if (Array.isArray(barColors)) return barColors[index % barColors.length];
    return theme.palette.grey[700];
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 2, borderRadius: 2 }}>
      <Typography variant="h6" mb={1} color="text.primary" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
        >
          {isHorizontal ? (
            <>
              <XAxis
                type="number"
                dataKey={dataKey}
                stroke={theme.palette.text.secondary}
                tick={{ fill: theme.palette.text.primary }}
              />
              <YAxis
                type="category"
                dataKey={labelKey}
                stroke={theme.palette.text.secondary}
                tick={{ fill: theme.palette.text.primary }}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey={labelKey}
                stroke={theme.palette.text.secondary}
                tick={{ fill: theme.palette.text.primary }}
              />
              <YAxis
                orientation='right'
                stroke={theme.palette.text.secondary}
                tick={{ fill: theme.palette.text.primary }}
              />
            </>
          )}
          {showGrid && <>
            <XAxis axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
          </>}
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey={dataKey} radius={barRadius}>
            {data.map((d, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(index, d)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default GlobalBarChart;
