// hooks/useGetSystemHealth.ts
import { useQuery } from "@tanstack/react-query";
import { aiCoreInstance, backendInstance } from "../api";
import { SystemHealthResponse } from "./types";

// First API: Get system health
const getSystemHealth = async (): Promise<SystemHealthResponse> => {
  const response = await backendInstance.get<SystemHealthResponse>("/");
  return response.data;
};

// Second API: Get AI Core health
const getAiCoreHealth = async (): Promise<unknown> => {
  const response = await aiCoreInstance.get("/health");
  return response.data;
};

// Hook: Fetch system health and AI Core health, merge the data
export const useGetSystemHealth = () => {
  return useQuery({
    queryKey: ["system-health"],
    queryFn: async () => {
      const details: Record<string, { status: "up" | "down" }> = {};

      // Try to fetch system health
      try {
        const systemHealth = await getSystemHealth();

        // Assume systemHealth.details contains the services like auth, labs, mailer
        if (systemHealth?.details) {
          for (const [key, value] of Object.entries(systemHealth.details)) {
            details[key] = {
              status: value.status === "up" ? "up" : "down",
            };
          }
        }
      } catch (error:any) {
        const systemHealth = error?.response?.data 
        if (systemHealth?.details) {
          for (const [key, value] of Object.entries(systemHealth.details) as any) {
            details[key] = {
              status: value.status === "up" ? "up" : "down",
            };
          }
        }
      }

      // Try to fetch AI Core health
      try {
        await getAiCoreHealth();
        details.aiCore = { status: "up" };
      } catch (error) {
        details.aiCore = { status: "down" };
      }

      // Return modified data object
      console.log(details)
      return { details };
    }
  });
};
