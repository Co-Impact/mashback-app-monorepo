import React, { FC } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Box, Typography } from '@mui/material';

type ChartData = {
  name: string;
  value: number;
}[];

type DonutChartProps = {
  title?: string;
  data: ChartData;
  colorMap?: Record<string, string>;
};

const CustomTooltip: FC<{ active?: boolean; payload?: any }> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <Box sx={{ backgroundColor: '#333', p: 1, borderRadius: 1 }}>
        <Typography variant="subtitle2" sx={{ color: '#fff' }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#ccc' }}>
          {value}
        </Typography>
      </Box>
    );
  }
  return null;
};

const DonutPieChart: FC<DonutChartProps> = ({
  title = 'Category Breakdown',
  data,
  colorMap = {},
}) => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', p: 2, borderRadius: 2 }}>
      <Typography variant="h6" mb={1} color="text.primary" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60} // 👈 donut hole
            dataKey="value"
            label={({ name }) => name}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorMap[entry.name.toLowerCase()] || '#8884d8'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DonutPieChart;
