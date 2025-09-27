import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { toast } from "react-toastify";

const deleteRegion = async (id: string): Promise<unknown> => {
  return await backendInstance.delete(`/region/${id}`);
};

export const useDeleteRegion = () => {
  return useMutation({
    mutationKey: ["delete-region"],
    mutationFn: (id: string) => deleteRegion(id),
    onSuccess: () => {
      toast.success("Region deleted successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error deleting region: ${error.message}`);
    },
  });
};
