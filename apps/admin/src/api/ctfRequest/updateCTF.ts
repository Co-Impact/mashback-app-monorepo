import { backendInstance } from "../api.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ICaptureTheFlag } from "../types.ts";

const updateCTF = async (
  id: string,
  data: Partial<ICaptureTheFlag>,
): Promise<any> => {
  return await backendInstance.patch(`/ctf/${id}`, data);
};

export const useUpdateCTF = () => {
  return useMutation({
    mutationKey: ["update-ctf"],
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ICaptureTheFlag>;
    }) => updateCTF(id, data),
    onSuccess: () => {
      toast.success("CTF updated successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error updating CTF: ${error.message}`);
    },
  });
};
