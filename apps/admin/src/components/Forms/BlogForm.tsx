import { TextareaAutosize, TextField } from "@mui/material";
import { FC } from "react";

interface Prop {
  onChange: (value: unknown) => void;
}
export const BlogForm: FC<Prop> = ({ onChange }) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="title"
        name="blogTitle"
        onChange={onChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Sub Title"
        name="subTitle"
        onChange={onChange}
      />
      <TextareaAutosize aria-label={"body"} name={"body"} />
    </>
  );
};
