import { useQuery } from "@tanstack/react-query"
import { backendInstance } from "../api";
import type { GetRunCtfByIdResponse } from "../types";

const getRunCtfByUserId = async (id: string): Promise<GetRunCtfByIdResponse[]> => {
    return (await backendInstance.get(`/ctf/active-ctf/${id}`)).data
}

export const useGetActiveCtfByUserId = (id: string) => {
    return useQuery({
        queryKey: ['active-ctf',id],
        queryFn: () => getRunCtfByUserId(id),
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

