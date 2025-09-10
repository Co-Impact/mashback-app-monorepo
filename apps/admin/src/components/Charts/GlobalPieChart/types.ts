
interface PieChartDataItem {
  name: string;
  value: number;
}

export interface GlobalPieChartProps {
  title?: string;
  data: PieChartDataItem[];
  colorMap?: Record<string, string>; // key: label name, value: color hex
}

export interface CustomTooltipProps {
  active?: boolean;
    payload?: any;
}