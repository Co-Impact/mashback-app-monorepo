import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { IBusiness } from "../types";
import { toast } from "react-toastify";

const createNewBusiness = async (data: IBusiness) => {
  return await backendInstance.post("/business", data);
};

const updateBusiness = async (data: Partial<IBusiness>): Promise<IBusiness> => {
  return await backendInstance.patch(`/business/${data.id}`, data);
};

export const useCreateNewBusiness = () => {
  return useMutation({
    mutationKey: ["business"],
    mutationFn: (data: IBusiness) => createNewBusiness(data),
    onSuccess: () => {
      toast.success("business creates successfully!");
    },
    onError: (error: { message: string }) => {
      toast.error(`Error while create business: ${error.message}`);
    },
  });
};

export const useUpdateNewBusiness = () => {
  return useMutation({
    mutationKey: ["business"],
    mutationFn: (data: IBusiness) => createNewBusiness(data),
    onSuccess: () => {
      toast.success("business creates successfully!");
    },
    onError: (error: { message: string }) => {
      toast.error(`Error while create business: ${error.message}`);
    },
  });
};

export const useUpdateBusiness = () => {
  return useMutation({
    mutationKey: ["business"],
    mutationFn: (data: Partial<IBusiness>) => updateBusiness(data),
    onSuccess: () => {
      toast.success("business updated successfully!");
    },
    onError: (error: { message: string }) => {
      toast.error(`Error updating business: ${error.message}`);
      throw error;
    },
  });
};
