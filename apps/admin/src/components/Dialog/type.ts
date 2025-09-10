import { UseMutateFunction } from "@tanstack/react-query";
import { FC } from "react";
import { FormDialog } from "../Forms/types/type.ts";

// export interface FormProp<T> {
//   control: Control<T, any>;
//   isPending: boolean;
//   errors: {
//     name: {
//       message: string;
//     };
//   };
// }

export interface CourseFormValues {
  // Step 1: Information
  name: string;
  description: string;
  price: number | string;
  test: boolean;

  // Step 2: Content
  content: {
    title: string;
    time: string;
    description: string;
  }[];

  // Step 3: Configuration
  certificate: boolean;
  labs: string;
  points: number | string;
}


export interface DialogFrom<T> {
  dialogTitle: string;
  description?: string;
  open: boolean;
  query: UseMutateFunction<T, Error, T, unknown>;
  onClose: () => void;
  FormComponents: FC<FormDialog>;
  defaultValues: any;
}
