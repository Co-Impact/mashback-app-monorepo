import { useMutation } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { toast } from "react-toastify";

const deleteNews = async (id:string): Promise<unknown> => {
  return await backendInstance.delete(`/news/${id}`);
};

export const useDeleteNews = () => {
  return useMutation({
    mutationKey: ["delete-news"],
    mutationFn: (id: string) => deleteNews(id),
    onSuccess: () => {
      toast.success("News deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Error deleting news: ${error.message}`);
    },
  });
};
