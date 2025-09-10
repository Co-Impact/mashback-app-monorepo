import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { ICoupon } from "../types";

const getAllCoupons = async (): Promise<ICoupon[]> => {
  return (await backendInstance.get("/coupon")).data;
};


export const useGetAllCoupons = () => {
  return useQuery({ queryKey: ["coupons"], queryFn: () => getAllCoupons() });
};
