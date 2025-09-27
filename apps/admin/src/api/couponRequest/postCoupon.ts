import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { ICoupon } from "../types";
import { toast } from "react-toastify";

const postCoupon = async (data: any): Promise<ICoupon> => {
  return await backendInstance.post("/coupon", data);
};

export const usePostCoupon = () => {
  return useMutation({
    mutationKey: ["coupon"],
    mutationFn: (data: any) => postCoupon(data),
    onSuccess: () => {
      toast.success("Coupon created successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error while create coupon: ${error.message}`);
    },
  });
};
