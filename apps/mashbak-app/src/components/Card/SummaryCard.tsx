import { FC } from "react";
import { Box, Card, Typography } from "@mui/material";

interface Props {
  chartData: number;
  title: string;
  subtitle: string;
}
export const SummaryCard: FC<Props> = ({ title, subtitle }) => {
  return (
    <Card>
      <Box sx={{ width: "30px", height: "30px" }}>chart</Box>
      <Box>
        <Typography>{title}</Typography>
        <Box>{subtitle}</Box>
      </Box>
    </Card>
  );
};
