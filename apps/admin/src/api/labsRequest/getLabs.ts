import { useMutation, useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { ILab } from "../types.ts";
import { ILabProgress } from "./types.ts";

const getLabByID = async (id: string): Promise<ILab> => {
  return (await backendInstance.post(`/labs/${id}`)).data;
};

const getAllLabs = async (): Promise<Array<ILab>> => {
  return (await backendInstance.get("/labs/all")).data;
};

const getLabByFilter = async () => {
  return (await backendInstance.get("/labs/filter")).data;
};

export const useGetAllLabs = () => {
  return useQuery({
    queryKey: ["labs"],
    queryFn: () => getAllLabs(),
  });
};

export const useGetLabByID = (id: string) => {
  return useQuery({
    queryKey: ["labs", id],
    queryFn: () => getLabByID(id),
    enabled: !!id,
  });
};

const getUserLabs = async (
  id: string,
  data?: any,
): Promise<Array<ILabProgress>> => {
  return (await backendInstance.post(`/labs/filter/${id}`, data)).data;
};

export const useGetLabs = () => {
  return useMutation({
    mutationKey: ["user-labs"],
    mutationFn: (id: string, data?: any) => getUserLabs(id, data),
  });
};
