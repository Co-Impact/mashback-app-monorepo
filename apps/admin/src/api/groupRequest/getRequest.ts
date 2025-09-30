import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api.ts";

const getAllTeams = async () => {
  return (await backendInstance.get("/team/filter")).data;
};

const getTeamByID = async (id: string) => {
  return (await backendInstance.get(`/team/${id}`)).data;
};

export const useGetAllTeams = () => {
  return useQuery({ queryKey: ["team"], queryFn: () => getAllTeams() });
};

export const useGetTeamById = (id: string) => {
  return useQuery({ queryKey: ["team", id], queryFn: () => getTeamByID(id) });
};
