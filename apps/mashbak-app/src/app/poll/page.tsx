"use client";
import { Avatar, Box, Card, Chip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const PollPage = () => {
  const router = useRouter();
  const pollQuestion = [
    {
      label: "Should college education be free for everyone? Why or why not?",
      id: "asasdf",
      count: 123,
      auther: { id: "", name: "", image: "" },
    },
    {
      label: "Should college education be free for everyone? Why or why not?",
      id: "asdfasdf",
      count: 123,
      auther: { id: "", name: "", image: "" },
    },
  ];
  return (
    <Box>
      <Box>
        <Typography variant="h5">Polls</Typography>
        <Typography>you submitted to 25 polls</Typography>
      </Box>
      <Box>
        {pollQuestion.map(({ label, id, count }) => (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "5px 10px",
              marginBottom: 2,
              cursor: "pointer",
            }}
            key={id}
            onClick={() => router.push(`poll/${id}`)}
          >
            <Typography
              sx={{
                margin: "5px 0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
              variant={"body2"}
            >
              {label}
            </Typography>
            <Divider />
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                margin: "5px 0",
              }}
            >
              <Chip
                avatar={<Avatar src={"abasdfas"} alt={""} />}
                label={"asfasdf"}
                size={"small"}
              />
              <Chip icon={<HowToVoteIcon />} label={count} size={"small"} />
              <Chip icon={<WhatshotIcon />} size={"small"} />
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PollPage;
