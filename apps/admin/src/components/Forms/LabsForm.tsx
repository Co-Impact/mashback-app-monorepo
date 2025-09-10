import { TextField } from "@mui/material";
import { FC } from "react";

interface Prop {
  onChange: (value: unknown) => void;
}
export const LabsForm: FC<Prop> = ({ onChange }) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        name="firstName"
        required
      />
    </>
  );
};
