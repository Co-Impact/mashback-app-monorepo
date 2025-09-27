import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { toast } from "react-toastify";

const updateRegion = async (
  data: object & { id: string },
): Promise<unknown> => {
  return await backendInstance.patch(`/region/${data.id}`, data);
};

export const useUpdateRegion = () => {
  return useMutation({
    mutationKey: ["update-region"],
    mutationFn: (data: object & { id: string }) => updateRegion(data),
    onSuccess: () => {
      toast.success("Region updated successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error updating region: ${error.message}`);
    },
  });
};
