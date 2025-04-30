import { Avatar, Box, Card, Chip, Container, Typography } from "@mui/material";
import Link from "next/link";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";
import EventIcon from "@mui/icons-material/Event";
import Divider from "@mui/material/Divider";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const discussionPage = () => {
  const data = [
    {
      id: 1,
      date: "2025-04-29",
      question:
        "Is social media more harmful than beneficial to mental health?",
      totalAnswers: 0,
    },
    {
      id: 2,
      date: "2025-04-29",
      question:
        "Should college education be free for everyone? Why or why not?",
      totalAnswers: 0,
    },
    {
      id: 3,
      date: "2025-04-29",
      question:
        "What role should AI and automation play in the future job market?",
      totalAnswers: 0,
    },
    {
      id: 4,
      date: "2025-04-29",
      question:
        "How can students best balance academic responsibilities with personal growth?",
      totalAnswers: 0,
    },
    {
      id: 5,
      date: "2025-04-29",
      question: "Do grades accurately measure intelligence or learning?",
      totalAnswers: 0,
    },
    {
      id: 6,
      date: "2025-04-29",
      question: "Is cancel culture a form of accountability or censorship?",
      totalAnswers: 0,
    },
    {
      id: 7,
      date: "2025-04-29",
      question: "How should colleges address climate change on their campuses?",
      totalAnswers: 0,
    },
    {
      id: 8,
      date: "2025-04-29",
      question: "Should voting be mandatory in democratic societies?",
      totalAnswers: 0,
    },
    {
      id: 9,
      date: "2025-04-29",
      question:
        "What is the impact of part-time jobs on students’ academic performance?",
      totalAnswers: 0,
    },
    {
      id: 10,
      date: "2025-04-29",
      question:
        "Is it better to follow your passion or to choose a career based on job security?",
      totalAnswers: 0,
    },
  ];
  return (
    <Container>
      <Box>
        <h1>Discussion</h1>
        <p>Welcome to the discussion page!</p>
      </Box>
      <Box>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {data.map(({ question, date, totalAnswers, id }, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Card
                  sx={{
                    margin: "10px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  component={Link}
                  href={`/discussion/${id}`}
                >
                  <Box>
                    <Typography>{question}</Typography>
                  </Box>
                  <Divider sx={{ margin: "4px 0" }} />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Chip
                      avatar={
                        <Avatar
                          alt="Natacha"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcMxLW5LbeJApiOdKAWdx7973rVC1iEUPtXg&s"
                        />
                      }
                      size={"small"}
                      label={"Natacha"}
                    />
                    <Divider orientation={"vertical"} flexItem={true} />
                    <Chip size={"small"} icon={<EventIcon />} label={date} />
                    <Divider orientation={"vertical"} flexItem={true} />
                    <Chip
                      size={"small"}
                      icon={<QuestionAnswerIcon />}
                      label={totalAnswers}
                    />
                  </Box>
                </Card>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Container>
  );
};

export default discussionPage;
