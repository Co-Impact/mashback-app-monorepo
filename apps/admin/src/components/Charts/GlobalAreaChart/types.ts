import { ReactNode } from "react";

export interface AreaChartDataItem {
  [key: string]: string | number;
}

export interface GlobalAreaChartProps {
  title?: string;
  data: AreaChartDataItem[];
  dataKey?: string;
  labelKey?: string;
  tooltipLabelPrefix?: string;
  color?: string;
  height?: number,
  header?:ReactNode
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: string | number }[];
  label?: string;
  tooltipLabelPrefix?: string;
}