import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { Features } from "../types";
import { toast } from "react-toastify";

const postFeature = async (data: any): Promise<Features> => {
  return await backendInstance.post("/feature", data);
};

export const usePostFeature = () => {
  return useMutation({
    mutationKey: ["feature"],
    mutationFn: (data: any) => postFeature(data),
    onSuccess: () => {
      toast.success("Coupon created successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error while create coupon: ${error.message}`);
    },
  });
};
