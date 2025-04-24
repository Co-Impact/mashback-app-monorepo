"use client";
import { FC, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

interface PollProps {
  question: string;
  options: string[];
}
const Poll: FC<PollProps> = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [votes, setVotes] = useState(options.map(() => 0));
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption !== null) {
      const updatedVotes = [...votes];
      updatedVotes[selectedOption] += 1;
      setVotes(updatedVotes);
      setHasVoted(true);
    }
  };

  const totalVotes = votes.reduce((sum, vote) => sum + vote, 0);

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
      <Typography variant="h5" gutterBottom>
        {question}
      </Typography>

      {!hasVoted ? (
        <FormControl>
          <RadioGroup
            value={selectedOption}
            onChange={(e) => setSelectedOption(Number(e.target.value))}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleVote}
            disabled={selectedOption === null}
            sx={{ mt: 2 }}
          >
            Submit Vote
          </Button>
        </FormControl>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom>
            Results:
          </Typography>
          {options.map((option, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1">{option}</Typography>
              <LinearProgress
                variant="determinate"
                value={(votes[index] / totalVotes) * 100}
                sx={{ height: 10, borderRadius: 1, mt: 0.5 }}
              />
              <Typography variant="caption">
                {votes[index]} votes (
                {((votes[index] / totalVotes) * 100).toFixed(1)}%)
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
export default Poll;
