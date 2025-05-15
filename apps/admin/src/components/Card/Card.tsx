import { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { CardItem } from "./type.ts";
import { useNavigate } from "react-router";

export const CardElement: FC<CardItem> = ({ label, value, path }) => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <Card sx={{ minWidth: 275 }} onClick={() => handleClick(path ?? "")}>
      <CardContent>
        <Typography variant="h5" component="div">
          {label}
        </Typography>
        <Typography variant="h4" color="text.secondary">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
