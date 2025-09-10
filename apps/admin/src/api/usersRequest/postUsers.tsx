import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { toast } from "react-toastify";
import { IUser } from "../types.ts";

const createNewUser = async (data: IUser): Promise<IUser> => {
  return await backendInstance.post("/users", data);
};

export const usePostUser = () => {
  return useMutation({
    mutationKey: ["users"],
    mutationFn: (data: IUser) => createNewUser(data),
    onSuccess: () => {
      toast.success("user opened successfully!");
    },
    onError: (error) => {
      toast.error(`Error while open user data: ${error.message}`);
    },
  });
};
