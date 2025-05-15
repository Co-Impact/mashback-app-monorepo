"use client";
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

type PollProps = {
  question: string;
  options: string[];
};

export default function PollPage() {
  // Example poll
  const poll: PollProps = {
    question: "What's your favorite JavaScript framework?",
    options: ["React", "Vue", "Angular", "Svelte"],
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedOption) return alert("Please select an answer.");
    setSubmitted(true);
  };

  return (
    <Container>
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {poll.question}
          </Typography>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {poll.options.map((option, idx) => (
                <FormControlLabel
                  key={idx}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>

          {submitted && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              Thanks for voting! You selected: <strong>{selectedOption}</strong>
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
