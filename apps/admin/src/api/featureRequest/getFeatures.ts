import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { Features } from "../types";

const getAllFeatures = async (): Promise<Features[]> => {
  return (await backendInstance.get("/feature")).data;
};


export const useGetAllFeatures = () => {
  return useQuery({ queryKey: ["features"], queryFn: () => getAllFeatures() });
};
