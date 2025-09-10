import { Box, Button, DialogContent, Stack } from "@mui/material";
import {
  CloudProvider,
  CreateLabs,
  Difficulty,
  LabType,
  OSType,
} from "../../api/types.ts";
import { useCreateNewLab } from "../../api/labsRequest/postLabs.ts";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllPackages } from "../../api/packageRequest/getPackage.ts";
import { HorizontalSteps } from "../Steps/HorizontalSteps.tsx";
import { LabDetailsForm } from "../Forms/Lab/LabDetailsForm.tsx";
import { LabFlagsForm } from "../Forms/Lab/LabFlagsForm.tsx";
import { LabConfigForm } from "../Forms/Lab/LabConfigForm.tsx";
import { LabStepsForm } from "../Forms/Lab/LabStepsForm.tsx";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  open?: boolean;
  onClose: () => void;
}

export const LabForm: FC<Props> = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { data } = useGetAllPackages();
  const queryClient = useQueryClient();
  const packageData = data
    ? data.map((item) => ({ name: item.name, id: item.id }))
    : [];
  const { mutateAsync, isPending } = useCreateNewLab();
  const steps: Array<string> = [
    "Lab Details",
    "Flag Information",
    "Lab Steps",
    "Confirmation",
  ];
  const { control, handleSubmit, trigger, watch, reset, setValue } =
    useForm<CreateLabs>({
      defaultValues: {
        name: "",
        packages: [],
        description: "",
        ctfId: "",
        azureImage: "",
        timeLimit: 0,
        cloudProvider: CloudProvider.AWS,
        tag: [],
        os: OSType.LINUX,
        difficult: Difficulty.EASY,
        ports: [],
        price: 0,
        attachment: [],
        point: 0,
        labsSteps: [{ description: "", title: "" }],
        flag: [],
        type: LabType.RedTeam,
        openBy: "",
        isActive: true,
        isCtf: false,
      },
    });

  const onSubmit = async (data: CreateLabs) => {
    const formData = new FormData();
    console.log(data);
    for (const file of data.attachment as any) {
      formData.append("files", file as any);
    }
    const body = {};

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "attachment") {
        // TODO: Handle other types of data properly
        (body as any)[key] = value;
      }
    });

    formData.append("body", JSON.stringify(body));
    try {
      await mutateAsync(formData);
      await queryClient.refetchQueries({ queryKey: ["labs"] });
      onClose();
      reset();
      setActiveStep(0);
    } catch (err) {
      console.log("Error creatng lab ", err);
    }
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <DialogContent>
        <Box mb={1}>
          <HorizontalSteps steps={steps} activeStep={activeStep} />
        </Box>
        {activeStep === 0 && (
          <LabDetailsForm setValue={setValue} control={control} />
        )}
        {activeStep === 1 && <LabFlagsForm control={control} />}
        {activeStep === 2 && <LabStepsForm control={control} />}
        {activeStep === 3 && (
          <LabConfigForm
            control={control}
            packageData={packageData}
            watch={watch}
          />
        )}
      </DialogContent>
      <Stack
        px={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button color="error" key="reset" onClick={() => reset()}>
          Reset
        </Button>
        <Stack direction={"row"}>
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
              {isPending ? "Submitting..." : "Submit "}
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
};
