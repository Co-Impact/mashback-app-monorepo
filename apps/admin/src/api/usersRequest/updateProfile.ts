import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserProfile } from "../../pages/user/types";
import { backendInstance } from "../api";

const updateProfile = async (data: Partial<UserProfile> & {id:string}): Promise<UserProfile> => {
  return (await backendInstance.put(`/users/${data.id}`, data)).data;
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ["profile-update"],
    mutationFn: async (data: Partial<UserProfile> & {id:string}) => await updateProfile(data),
    onSuccess: async () => {
      toast.success("Updated successfully!");
    },
    onError: (error) => {
      toast.error(`Error updating: ${error.message}`);
    },
  });
};
