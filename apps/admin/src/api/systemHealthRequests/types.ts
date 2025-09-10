
export interface ServiceStatus {
  status: "up" | "down";
  message? : string;
}

export interface SystemHealthResponse {
  status: string;
  info: Record<string, ServiceStatus>;
  error: Record<string, unknown>;
  details: Record<string, ServiceStatus>;
}
