"use client";
import { FC, useState } from "react";
import { Box, Typography } from "@mui/material";

interface PollProps {
  question: string;
  options: string[];
}
const Poll: FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState(false);

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        textAlign: "center",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom></Typography>
    </Box>
  );
};
export default Poll;
