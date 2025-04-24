"use client";
import { Box, Card, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const PollPage = () => {
  const router = useRouter();
  const pollQuestion = [
    { label: "asdfasdf", id: "asdfasdf", count: 123 },
    { label: "asdfasdf", id: "asdfasdf", count: 123 },
  ];
  return (
    <Box>
      <Box>{/*    TODO: statistic about Poll */}</Box>
      <Box>
        {pollQuestion.map(({ label, id, count }) => (
          <Card key={id} onClick={() => router.push(`/${id}`)}>
            <Typography>{`${label} ${count} answer this question`}</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PollPage;
