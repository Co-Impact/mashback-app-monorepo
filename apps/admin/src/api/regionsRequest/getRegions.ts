import { useQuery } from "@tanstack/react-query"
import { backendInstance } from "../api";
import type { GetRunCtfByIdResponse } from "../types";

const getRegions = async (): Promise<{ regionName: string; regionCode: string }[]> => {
  return [
    { regionName: 'US East (N. Virginia)', regionCode: 'us-east-1' },
    { regionName: 'US West (Oregon)', regionCode: 'us-west-2' },
    { regionName: 'EU (Ireland)', regionCode: 'eu-west-1' },
    { regionName: 'Asia Pacific (Tokyo)', regionCode: 'ap-northeast-1' },
    { regionName: 'Asia Pacific (Mumbai)', regionCode: 'ap-south-1' },
  ];
};


export const useGetRegions = () => {
    return useQuery({
        queryKey: ['regions'],
        queryFn: () => getRegions(),
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60 * 5, 
    })
}


const getActiveCtfFilter = async (): Promise<GetRunCtfByIdResponse[]> => {
    return (await backendInstance.post('/ctf/active-ctf/filter')).data
}

export const useGetActiveCtfFilter = () => {
    return useQuery({
        queryKey: ['active-ctf-filter'],
        queryFn: () => getActiveCtfFilter(),
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60 * 5, 
    })
}

