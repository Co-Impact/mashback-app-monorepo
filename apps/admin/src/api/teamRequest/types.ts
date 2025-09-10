import { User } from "../types";


export interface TeamUser extends User {
    invitationStatus?: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}


export interface Team {
  id: string; // added
  avatar: string;
  name: string;
  owner: User
  point: string;
  memberCount: number;
  members: {user?:TeamUser, status: 'PENDING' | 'ACCEPTED' | 'REJECTED'}[]; // array of avatar URLs
}