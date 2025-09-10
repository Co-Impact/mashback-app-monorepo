import { backendInstance } from "../api.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const createCTF = async (data: any): Promise<any> => {
  return await backendInstance.post("/ctf", data);
};

export const useCreateCTF = () => {
  return useMutation({
    mutationKey: ['create-ctf'],
    mutationFn: (data: any) => createCTF(data),
    onSuccess: () => {
      toast.success("CTF created successfully!");
    },
    onError: (error) => {
      toast.error(`Error creating CTF: ${error.message}`);
    },
  });
};
