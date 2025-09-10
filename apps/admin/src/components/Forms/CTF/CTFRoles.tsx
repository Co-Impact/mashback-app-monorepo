import { Control, Controller } from "react-hook-form";
import { FC } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Difficulty } from "../../../api/types";

interface Props {
  control?: Control<any, any> | undefined;
}
export const CTFRoles: FC<Props> = ({ control }) => {
  return (
    <>
      <Controller
        name="difficulty"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal">
            <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
            <Select
              {...field}
              labelId="difficulty-select-label"
              label="Difficulty"
            >
              {Object.entries(Difficulty).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="requiredPoints"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            type={"number"}
            label="Required Points"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        )}
      />
    </>
  );
};
