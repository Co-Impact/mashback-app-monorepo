import { Control } from "react-hook-form";

export interface FormDialog {
  control: Control<any, any>;
  isPending?: boolean;
  errors?: {
    name: {
      message: string;
    };
  };
}
