import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api.ts";
import { IPackages } from "../types.ts";

const getAllPackages = async (): Promise<Array<IPackages>> => {
  return (await backendInstance.get("/package")).data;
};

const getPackageById = async (id: string) => {
  return (await backendInstance.get(`/package/${id}`)).data;
};

export const useGetAllPackages = () => {
  return useQuery({
    queryKey: ["package"],
    queryFn: () => getAllPackages(),
  });
};
