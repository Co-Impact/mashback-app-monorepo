import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { toast } from "react-toastify";

const updateRegion = async (data: Object&{id:string}): Promise<unknown> => {
  return await backendInstance.patch(`/region/${data.id}`, data);
};

export const useUpdateRegion = () => {
  return useMutation({
    mutationKey: ["update-region"],
    mutationFn: (data: Object&{id:string}) => updateRegion(data),
    onSuccess: () => {
      toast.success("Region updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error updating region: ${error.message}`);
    },
  });
};
