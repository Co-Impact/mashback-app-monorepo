import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CreateCTF, Difficulty } from "../../api/types.ts";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { HorizontalSteps } from "../Steps/HorizontalSteps.tsx";
import CloseIcon from "@mui/icons-material/Close";
import { CTFIformation } from "../Forms/CTF/CTFInformation.tsx";
import { CTFRoles } from "../Forms/CTF/CTFRoles.tsx";
import { CTFConfiguration } from "../Forms/CTF/CTFConfiguration.tsx";
import { useCreateCTF } from "../../api/ctfRequest/postCTF.ts";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  open?: boolean;
  onClose: () => void;
}

export const CTFForm: FC<Props> = ({
  onClose,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { mutateAsync, isPending } = useCreateCTF();
  const queryClient = useQueryClient();
  const steps: Array<string> = ["Information", "Roles", "Confirmation"];
  const { control, handleSubmit, trigger, reset } = useForm<CreateCTF>({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      points: 0,
      requiredPoints: 0,
      difficulty: Difficulty.EASY,
      azureImage: "",
      diagram: null,
    },
  });

  const onSubmit = async (data: CreateCTF) => {
    try {
      await mutateAsync(data);
      queryClient.refetchQueries({ queryKey: ["ctf"] });
      setActiveStep(0)
      reset()
      onClose();
    } catch (err) {
      console.log('Error creatng ctf ', err)
    }
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
    console.log(activeStep);
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      <DialogContent>
        <Box mb={1}>
          <HorizontalSteps steps={steps} activeStep={activeStep} />
        </Box>
        {activeStep === 0 && <CTFIformation control={control} />}
        {activeStep === 1 && <CTFRoles control={control} />}
        {activeStep === 2 && <CTFConfiguration control={control} />}
      </DialogContent>
      <DialogActions>
        <Button key="back" disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button key="next" variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            disabled={isPending}
            key="submit"
            type={"submit"}
            variant="contained"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        )}
      </DialogActions>
    </form>
  );
};
