import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { toast } from "react-toastify";

const createNews = async (data: any): Promise<unknown> => {
  return await backendInstance.post("/news", data);
};

export const useCreateNews = () => {
  return useMutation({
    mutationKey: ["create-region"],
    mutationFn: (data: any) => createNews(data),
    onSuccess: () => {
      toast.success("News created successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error creating mews: ${error.message}`);
    },
  });
};
