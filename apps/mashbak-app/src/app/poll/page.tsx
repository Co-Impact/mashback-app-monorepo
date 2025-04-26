"use client";
import { Box, Card, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const PollPage = () => {
  const router = useRouter();
  const pollQuestion = [
    { label: "asdfasdf", id: "asasdf", count: 123 },
    { label: "asdfasdf", id: "asdfasdf", count: 123 },
  ];
  return (
    <Box>
      <Box>{/*    TODO: statistic about Poll */}</Box>
      <Box>
        {pollQuestion.map(({ label, id, count }) => (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 2,
              marginBottom: 2,
              cursor: "pointer",
            }}
            key={id}
            onClick={() => router.push(`poll/${id}`)}
          >
            <Typography>{label}</Typography>
            <Typography>{`${count} answer this question`}</Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PollPage;
