import { backendInstance } from "../api.ts";
import { useQuery } from "@tanstack/react-query";
import { ICaptureTheFlag } from "../types.ts";

const getCTFById = async (id: string): Promise<ICaptureTheFlag> => {
  return (await backendInstance.get(`/ctf/${id}`)).data;
};

const getAllCTF = async () : Promise<ICaptureTheFlag[]> => {
  return (await backendInstance.get(`/ctf`)).data};

export const useGetAllCTF = () => {
  return useQuery({ queryKey: ["ctf"], queryFn: () => getAllCTF(),staleTime: Infinity, retry: false, refetchOnWindowFocus: false });
};

export const useGetCTFById = (id: string) => {
  return useQuery({ queryKey: ["ctf",id], queryFn: () => getCTFById(id) });
};
