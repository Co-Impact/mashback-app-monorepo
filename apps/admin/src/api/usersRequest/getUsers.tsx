import {UserProfile} from "../../pages/user/types";
import {backendInstance} from "../api";
import {useQuery} from "@tanstack/react-query";

const getAllUsers = async () => {
  return (await backendInstance.get("/users")).data;
};

const getAllUsersStatistics = async () => {
  return (await backendInstance.get("/users/statistics")).data;
};

const getAllUsersByCompanyID = async (id: string) => {
  return (await backendInstance.get(`/users/sub-course${id}`)).data;
};

const getUserByID = async (id: string): Promise<UserProfile> => {
  return (await backendInstance.get(`/users/${id}`)).data;
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};

export const useGetUsersStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: getAllUsersStatistics,
  });
};

export const useGetUsersByCompanyID = (id: string) => {
  return useQuery({
    queryKey: ["users", { id }],
    queryFn: () => getAllUsersByCompanyID(id),
    enabled: !!id,
  });
};

export const useGetUserByID = (id: string) => {
  return useQuery({
    queryKey: ["users", { id }],
    queryFn: () => getUserByID(id),
    enabled: !!id,
  });
};
