import { Input, TextField } from "@mui/material";
import { FC } from "react";

interface Prop {
  onChange: (value: unknown) => void;
}
export const SubCourseForm: FC<Prop> = ({ onChange }) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        onChange={onChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        required
        multiline
        rows={4}
      />
      <Input type="file" name="Course Logo" inputProps={{ accept: "file/*" }} />
    </>
  );
};
