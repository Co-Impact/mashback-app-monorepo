import { TextField } from "@mui/material";
import { FC } from "react";

interface Prop {
  onChange: (value: unknown) => void;
}
export const UserForm: FC<Prop> = ({ onChange }) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        name="firstName"
        onChange={onChange}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        name="lastName"
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        required
      />
      <TextField fullWidth margin="normal" label="Phone" name="phone" />
      {/*<Input type.ts="file" name="courseLogo" inputProps={{ accept: "image/*" }} />*/}
      {/*<DemoContainer components={["DatePicker"]}>*/}
      {/*  <DatePicker name="dateOfBirth" label="Date Of Birth" />*/}
      {/*</DemoContainer>*/}
      <TextField
        fullWidth
        margin="normal"
        label="github Url"
        name="githubUrl"
      />
      <TextField
        fullWidth
        margin="normal"
        label="linkedin Url"
        name="linkedinUrl"
      />
      <TextField fullWidth margin="normal" label="website" name="website" />
    </>
  );
};
