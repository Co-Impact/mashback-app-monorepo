import { Box, Chip, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { FC } from "react";
import Link from "next/link";

interface Props {
  id: string;
  question: string;
  // options: Array<{ option: string; votes: number }>;
  totalVotes: number;
}
export const PollItem: FC<Props> = ({ question, totalVotes, id }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      component={Link}
      href={`/poll/${id}`}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
        >
          {question}
        </Typography>
        <Chip size={"small"} icon={<HowToVoteIcon />} label={totalVotes} />
      </Box>
      <Box>
        <ArrowForwardIosIcon />
      </Box>
    </Box>
  );
};
