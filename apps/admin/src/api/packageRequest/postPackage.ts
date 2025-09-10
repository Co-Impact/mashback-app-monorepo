import { backendInstance } from "../api.ts";
import { IPackages } from "../types.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const createPackage = async (data: any) => {
  return (await backendInstance.post("/package", data)).data;
};

export const useCreatePackage = () => {
    return useMutation({
        mutationKey: ["feature"],
        mutationFn: (data: any) => createPackage(data),
        onSuccess: () => {
            toast.success('Coupon create successfully!');
        },
        onError: (error) => {
            toast.error(`Error while create coupon: ${error.message}`);
        }
    })
}

const getFilteredPackage = async (data: IPackages) => {
  return (await backendInstance.post("/package", data)).data;
};

export const useGetPackage = () => {
  return useMutation({
    mutationKey: ["labs"],
    mutationFn: (data: IPackages) => getFilteredPackage(data),
    onSuccess: async (data) => {
      toast.success("check all packages!");
    },
    onError: (error) => {
      toast.error(`Error while get packages: ${error.message}`);
    },
  });
};
