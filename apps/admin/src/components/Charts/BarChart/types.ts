
export interface ChartDataItem {
  [key: string]: string | number;
}

export interface GlobalBarChartProps {
  title?: string;
  data: ChartDataItem[];
  highlightIndex?: number | null;
  highlightColor?: string;
  dataKey?: string;
  labelKey?: string;
  tooltipLabelKey?: string;
  name?: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: any;
  label?: string;
}