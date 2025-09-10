import { backendInstance } from "../api.ts";
import { useQuery } from "@tanstack/react-query";
import { Team } from "./types.ts";

const getTeamsByUserId = async (id: string): Promise<Team[]> => {
  return (await backendInstance.get(`/team/user/${id}`)).data;
};

export const useGetTeamsByUserId = (id: string) => {
  return useQuery({
    queryKey: ["teams",'by-user-id',id],
    queryFn: () => getTeamsByUserId(id),
  });
};
