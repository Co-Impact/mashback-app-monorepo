import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { TagInput } from "../TagInput/TagInput";

interface Prop {
  onChange: (value: unknown) => void;
}
export const BusinessForm: FC<Prop> = ({ onChange }) => {
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="Company Name"
        name="name"
        required
        onChange={onChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="location"
        name="location"
        onChange={onChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="size"
        name="size"
        required
        onChange={onChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Industry</InputLabel>
        <Select
          label="Industry"
          name="industry"
          defaultValue=""
          onChange={onChange}
        >
          <MenuItem value="tech">tech</MenuItem>
          <MenuItem value="AdTech">AdTech</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </Select>
      </FormControl>
      <TagInput />
    </>
  );
};
