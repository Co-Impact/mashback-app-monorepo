import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DialogFrom } from "./type.ts";

export const DialogForm = <T extends object>({
  dialogTitle,
  description,
  open,
  onClose,
  query,
  FormComponents,
  defaultValues,
}: DialogFrom<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues,
  });
  const onSubmit = async (data: any) => {
    query(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            {description || "please fill this form"}
          </DialogContentText>
          <FormComponents control={control} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type={"submit"}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
