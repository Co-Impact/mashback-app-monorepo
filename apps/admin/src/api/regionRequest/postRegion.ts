import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { toast } from "react-toastify";

const createRegion = async (data: any): Promise<unknown> => {
  return await backendInstance.post("/region", data);
};

export const useCreateRegion = () => {
  return useMutation({
    mutationKey: ["create-region"],
    mutationFn: (data: any) => createRegion(data),
    onSuccess: () => {
      toast.success("Region created successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error creating region: ${error.message}`);
    },
  });
};
