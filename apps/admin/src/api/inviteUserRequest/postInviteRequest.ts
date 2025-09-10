import { backendInstance } from "../api.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// TODO: move this logic to userRequest
const sendInviteRequest = async (body: any) => {
  return (await backendInstance.post("/invitation/create-invitation", body))
    .data;
};

export const useSendInvite = () => {
  return useMutation({
    mutationKey: ["invitation"],
    mutationFn: (emails: Array<{ email: string }>) => sendInviteRequest(emails),
    onSuccess: () => {
      toast.success("invitation create successfully!");
    },
    onError: (error) => {
      toast.error(`Error while create invitation: ${error.message}`);
    },
  });
};
