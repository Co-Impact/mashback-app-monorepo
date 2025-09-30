import { backendInstance } from "../api.ts";
import { useQuery } from "@tanstack/react-query";

const getExample = async () => {
  return (await backendInstance.get("/team/filter")).data;
};

const getExampleById = async (id: string) => {
  return (await backendInstance.get(`/team/${id}`)).data;
};

export const useGetExample = () => {
  return useQuery({ queryKey: ["example"], queryFn: () => getExample() });
};

export const useGetExampleById = (id: string) => {
  return useQuery({
    queryKey: ["example", id],
    queryFn: () => getExampleById(id),
  });
};
