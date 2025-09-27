import { useState } from "react";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useModal } from "../../hooks/useModal";
import Information from "../Forms/Course/Information";
import CourseContent from "../Forms/Course/CourseContent";
import CourseConfiguration from "../Forms/Course/CourseConfiguration";
import CourseConfirmation from "../Forms/Course/CourseConfirmation";

const steps = ["Information", "Content", "Configuration", "Confirmation"];

const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  test: yup.boolean().required(),
  content: yup
    .array()
    .of(
      yup.object({
        title: yup.string().required("Title is required"),
        time: yup.string().required("Time is required"),
        description: yup.string().required("Description is required"),
      }),
    )
    .min(1, "At least one content section is required"),
  certificate: yup.boolean().required(),
  labs: yup.array().of(yup.string()).required("Labs is required"),
  points: yup
    .number()
    .typeError("Points must be a number")
    .required("Points is required"),
});

export type CourseFormValues = yup.InferType<typeof schema>;

const defaultValues: CourseFormValues = {
  name: "",
  description: "",
  price: 0,
  test: false,
  content: [
    { title: "", time: new Date().toISOString().slice(0, 16), description: "" },
  ],
  certificate: false,
  labs: [],
  points: 0,
};

const CourseDialog = () => {
  const { Modal, isOpen, close, open } = useModal();
  const [activeStep, setActiveStep] = useState(0);

  const { control, handleSubmit, trigger, getValues } =
    useForm<CourseFormValues>({
      defaultValues,
      resolver: yupResolver(schema as any),
      mode: "onTouched",
    });

  const onNext = async () => {
    let fieldsToValidate: (keyof CourseFormValues)[] = [];
    if (activeStep === 0)
      fieldsToValidate = ["name", "description", "price", "test"];
    if (activeStep === 1) fieldsToValidate = ["content"];
    if (activeStep === 2) fieldsToValidate = ["certificate", "labs", "points"];
    const valid = await trigger(fieldsToValidate);
    if (valid) setActiveStep((s) => s + 1);
  };

  const onBack = () => setActiveStep((s) => s - 1);

  const onSubmit = (data: CourseFormValues) => {
    close();
    alert("Course created!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <>
      <Button size="small" variant="contained" onClick={open}>
        New
      </Button>
      <Modal title="Create Course" showCloseIcon open={isOpen}>
        <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Information */}
          {activeStep === 0 && (
            <Box>
              <Information control={control} />
            </Box>
          )}

          {/* Step 2: Content */}
          {activeStep === 1 && <CourseContent control={control} />}

          {/* Step 3: Configuration */}
          {activeStep === 2 && <CourseConfiguration control={control} />}

          {/* Step 4: Confirmation */}
          {activeStep === 3 && <CourseConfirmation getValues={getValues} />}

          {/* Stepper Controls */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button disabled={activeStep === 0} onClick={onBack}>
              Back
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={onNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" variant="contained">
                Finish
              </Button>
            )}
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default CourseDialog;
