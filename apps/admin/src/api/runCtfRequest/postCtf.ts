import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { backendInstance } from "../api";

const createBusinessCtf = async (data: any) => {
    return (await backendInstance.post("/ctf/active-ctf/create", data)).data;
}

export const useCreateActiveCtf = () => {
    return useMutation({
        mutationKey: ["create-active-ctf"],
        mutationFn: (data:any) => createBusinessCtf(data),
        onSuccess: () => {
            toast.success("CTF created successfully");
        },
        onError: (error:any) => {
            toast.error(`Error creating ctf: ${error.message}`);
        },
    });
}