import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { toast } from "react-toastify";

const updateNews = async (data: Object&{id:string}): Promise<unknown> => {
  return await backendInstance.patch(`/news/${data.id}`, data);
};

export const useUpdateNews = () => {
  return useMutation({
    mutationKey: ["update-news"],
    mutationFn: (data: Object&{id:string}) => updateNews(data),
    onSuccess: () => {
      toast.success("News updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error updating news: ${error.message}`);
    },
  });
};
