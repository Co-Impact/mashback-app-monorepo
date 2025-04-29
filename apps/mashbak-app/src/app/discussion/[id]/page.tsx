import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { FC } from "react";

const DiscussionTimeline: FC = () => {
  const data = {
    discussion:
      "How can students best balance academic responsibilities with personal growth?",
    events: [
      { date: "2023-10-01", label: "Event 1", userid: "User 1" },
      { date: "2023-10-02", label: "Event 2", userid: "User 2" },
      { date: "2023-10-03", label: "Event 3", userid: "User 3" },
      { date: "2023-10-04", label: "Event 4", userid: "User 4" },
      { date: "2023-10-05", label: "Event 5", userid: "User 5" },
    ],
  };
  const { discussion, events } = data;
  return (
    <Container>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Typography color={"primary"}>{discussion}</Typography>
      </Card>
      <Timeline position="alternate">
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                <CardContent>
                  <Typography>{event.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.userid}
                  </Typography>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
};

export default DiscussionTimeline;
