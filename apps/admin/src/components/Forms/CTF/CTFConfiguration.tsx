import { Control, Controller } from "react-hook-form";
import { FC } from "react";
import { TextField } from "@mui/material";
import { CreateCTF } from "../../../api/types";

interface Props {
  control: Control<CreateCTF>;
}
export const CTFConfiguration: FC<Props> = ({ control }) => {
  return (
    <>
      <Controller
        name="azureImage"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            type={"text"}
            label="azure image"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error?.message}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
    </>
  );
};
