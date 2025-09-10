import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { NewsSource } from "../../components/Forms/News/types.ts";


const getNews = async (): Promise<NewsSource[]> => {
          return (await backendInstance.get(`/news`)).data;
};

export const useGetNews = () => {
    return useQuery({
        queryKey: ["news"],
        queryFn: () => getNews(),
    });
};


