import { backendInstance } from "../api.ts";
import { useQuery } from "@tanstack/react-query";
import { IEvent } from "../types.ts";

const getEventByID = async (id: string):Promise<IEvent> => {
  return (await backendInstance.get(`/events/${id}`)).data;
};

const getAllEvents = async (): Promise<IEvent[]> => {
  return (await backendInstance.get("/events")).data;
};

const getEventByFilter = async () => {
  return (await backendInstance.get("/events/filter")).data;
};

const deleteEvent = async (id: string) => {
  await backendInstance.delete(`/events/${id}`);
};

export const useGetEvent = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEvents(),
  });
};

export const useGetEventByID = (id: string) => {
  return useQuery({
    queryKey: ["events", { id }],
    queryFn: () => getEventByID(id),
    enabled: !!id,
  })
}
