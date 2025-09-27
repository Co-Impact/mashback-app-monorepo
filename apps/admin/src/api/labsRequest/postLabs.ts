import { backendInstance } from "../api.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ILab } from "../types.ts";
import { UpdateLabBody } from "./types.ts";

const createNewLab = async (data: FormData): Promise<ILab> => {
  return (await backendInstance.post("labs/create-lab", data)).data;
};

export const useCreateNewLab = () => {
  return useMutation({
    mutationKey: ["labs"],
    mutationFn: (data: FormData) => createNewLab(data),
    onSuccess: async () => {
      toast.success("lab create successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error while create lab: ${error.message}`);
    },
  });
};

const updateLab = async (id: string, data: UpdateLabBody): Promise<ILab> => {
  return (await backendInstance.patch(`labs/${id}`, data)).data;
};

export const useUpdateLab = () => {
  return useMutation({
    mutationKey: ["update-lab"],
    mutationFn: ({ id, data }: { id: string; data: UpdateLabBody }) =>
      updateLab(id, data),
    onSuccess: async () => {
      toast.success("lab updated successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error updating lab: ${error.message}`);
    },
  });
};
