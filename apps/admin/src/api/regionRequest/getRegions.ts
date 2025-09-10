import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { Region } from "../types.ts";
import { IFilterRegion } from "./types.ts";


const getRegionByFlter = async (data: IFilterRegion): Promise<Region[]> => {
  return (await backendInstance.post(`/region/filter`, data)).data;
};

export const useGetRegionByFilter = (data: IFilterRegion) => {
  return useQuery({
    queryKey: ["filter-region", data],
    queryFn: () => getRegionByFlter(data),
    enabled: !!data,
  });
};


