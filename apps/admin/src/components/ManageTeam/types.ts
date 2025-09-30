import { TeamUser } from "./SelectTeamMembers";
import { User } from "../../api/types.ts";

export interface Team {
  id: string; // added
  avatar: string;
  name: string;
  owner: User;
  point: string;
  memberCount: number;
  members: { user?: TeamUser; status: "PENDING" | "ACCEPTED" | "REJECTED" }[]; // array of avatar URLs
}
