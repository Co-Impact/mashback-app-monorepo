import { backendInstance } from "../api.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const deleteExample = async (id: string) => {
  return (await backendInstance.delete(`/team/${id}`)).data;
};

export const useDeleteExample = () => {
  return useMutation({
    mutationKey: ["example"],
    mutationFn: (data: any) => deleteExample(data),
    onSuccess: () => {
      toast.success("Delete team successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error deleting Group: ${error.message}`);
    },
  });
};
