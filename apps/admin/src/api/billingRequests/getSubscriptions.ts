import { useQuery } from "@tanstack/react-query";
import { backendInstance } from "../api.ts";

interface GetSubscriptionsRequest {
  customerId?: string;
}

const getSubscriptions= async (data?: GetSubscriptionsRequest): Promise<unknown[]> => {
  return (await backendInstance.post(`/billing/get-subscriptions`,data)).data;
};

export const uesGetSubscriptions = (data?: GetSubscriptionsRequest) => {
    console.log(data)
  return useQuery({
        queryKey: ['subscriptions', data?.customerId],
        queryFn: () => getSubscriptions(data),
        retry: 1,
        staleTime: 1000 * 60 * 5, 
    })
};
