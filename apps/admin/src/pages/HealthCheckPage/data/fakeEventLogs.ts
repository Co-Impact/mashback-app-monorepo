// data/fakeEventLogs.ts
export const fakeEventLogs = [
  {
    type: "log",
    timestamp: new Date().toISOString(),
    service: "Auth Service",
    message: "User login successful for user ID 12345.",
  },
  {
    type: "error",
    timestamp: new Date().toISOString(),
    service: "Mailer Service",
    message: "SMTP connection failed due to timeout error.",
  },
  {
    type: "warn",
    timestamp: new Date().toISOString(),
    service: "Labs Service",
    message:
      "Lab environment usage nearing quota limit. Consider scaling resources.",
  },
  {
    type: "debug",
    timestamp: new Date().toISOString(),
    service: "Auth Service",
    message: "Token validation passed for session ID abcdef.",
  },
  {
    type: "fatal",
    timestamp: new Date().toISOString(),
    service: "Mailer Service",
    message:
      "Critical failure in mail dispatch queue. Immediate attention required.",
  },
];
