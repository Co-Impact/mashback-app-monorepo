import * as React from "react";
import { FC, ReactElement } from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";

interface Props {
  title: string;
  value: number;
  icon?: ReactElement;
}
export const GlobalCardChart: FC<Props> = ({ title, value, icon }) => {
  return (
    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={20}>
          <SvgIcon>{icon}</SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography level="h3">{title}</Typography>
          <Typography level="body-md">{value}</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button variant="soft" size="sm">
          Add to Watchlist
        </Button>
        <Button variant="solid" size="sm">
          See breakdown
        </Button>
      </CardActions>
    </Card>
  );
};
