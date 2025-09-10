import { IBlog } from "../types.ts";
import { backendInstance } from "../api.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const createNewBlog = async (data: Partial<IBlog>) => {
  return await backendInstance.post("/blog", data);
};

const updateBlog = async (data: Partial<IBlog>) => {
  return await backendInstance.post("/blog", data);
};

export const usePostBusiness = () => {
  return useMutation({
    mutationKey: ["blog"],
    mutationFn: (data: Partial<IBlog>) => createNewBlog(data),
    onSuccess: () => {
      toast.success("blog create successfully!");
    },
    onError: (error) => {
      toast.error(`Error while create business: ${error.message}`);
    },
  });
};
