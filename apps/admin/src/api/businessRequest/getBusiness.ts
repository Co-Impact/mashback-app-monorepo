import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { IBusiness } from "../types.ts";

const getBusinessByID = async (id: string): Promise<IBusiness> => {
  console.log(id);
  return (await backendInstance.get(`/business/${id}`)).data;
};

const getAllBusiness = async (): Promise<Array<IBusiness>> => {
  return (await backendInstance.get("/business")).data;
};

const getBusinessByFilter = async () => {
  return (await backendInstance.get("/business")).data;
};

export const useGetBusiness = () => {
  return {
    getAllBusiness: useQuery({
      queryKey: ["business"],
      queryFn: () => getAllBusiness(),
    }),
    getBusinessByID: (id: string) => {
      return {
        queryKey: ["business", { id }],
        queryFn: () => getBusinessByID(id),
        enabled: !!id,
      };
    },
  };
};
