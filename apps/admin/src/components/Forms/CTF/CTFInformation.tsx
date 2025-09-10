import { Control, Controller } from "react-hook-form";
import { FC } from "react";
import { Checkbox, FormControlLabel, TextField, useTheme } from "@mui/material";

interface Props {
    control?: Control<any, any> | undefined;
}
export const CTFIformation: FC<Props> = ({ control }) => {
    const theme = useTheme();

    const calendarIconFilter =
        theme.palette.mode === 'dark'
            ? 'invert(100%)'
            : 'invert(0%)';

    return (
        <>
            <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        type={"text"}
                        label={"Name"}
                        {...field}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error?.message}
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        label={"Description"}
                        {...field}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!error}
                        helperText={error?.message}
                        multiline
                        rows={4}
                    />
                )}
            />

            <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={<Checkbox {...field} />}
                        label="Is Active"
                    />
                )}
            />
            <Controller
                name="points"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        type={"number"}
                        label="Points"
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
