import { backendInstance } from "../api.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CreatedEvent, IEvent } from "../types.ts";

const createNewEvent = async (data: CreatedEvent) => {
  return (await backendInstance.post("/events", data)).data;
};

const updateEvent = async (data: Partial<IEvent>) => {
  return await backendInstance.patch(`/events/${data.id}`, data);
};

export const usePostEvent = () => {
  return useMutation({
    mutationKey: ["create-event"],
    mutationFn: (data: any) => createNewEvent(data),
    onSuccess: () => {
      toast.success("Evente created successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error Creating Events: ${error.message}`);
    },
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationKey: ["update-event"],
    mutationFn: (data: never) => updateEvent(data),
    onSuccess: () => {
      toast.success("Evente updated successfully!");
    },
    onError: (error: { message: any }) => {
      toast.error(`Error Updating Event: ${error.message}`);
    },
  });
};
