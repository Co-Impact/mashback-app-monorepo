import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api";
import { IInviteUser } from "../types";

// TODO: move this logic to userRequest
const getAllInviteUsers = async (): Promise<IInviteUser[]> => {
  return (await backendInstance.get("/invitation/invited-users")).data;
};

export const useGetAllInviteUsers = () => {
  return useQuery({
    queryKey: ["invitation"],
    queryFn: () => getAllInviteUsers(),
  });
};
