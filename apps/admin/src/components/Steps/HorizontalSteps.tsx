import { FC } from "react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

interface Props {
  steps: Array<string>;
  activeStep: number;
}
export const HorizontalSteps: FC<Props> = ({ steps, activeStep }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((_, index) => (
          <Step key={index}>
            <StepLabel>{_}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
