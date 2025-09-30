import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { backendInstance } from "../api.ts";

const deleteTeam = async (id: string) => {
  return (await backendInstance.delete(`/team/${id}`)).data;
};

export const useDeleteTeam = () => {
  return useMutation({
    mutationKey: ["create-event"],
    mutationFn: (data: any) => deleteTeam(data),
    onSuccess: () => {
      toast.success("Delete team successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error deleting Group: ${error.message}`);
    },
  });
};
