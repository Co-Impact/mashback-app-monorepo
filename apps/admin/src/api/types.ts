import { Edge, Node } from "reactflow";

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  imageUrl?: string;
  status: boolean;
  dateOfBirth?: Date;
  githubUrl?: string;
  linkedinUrl?: string;
  website?: string;
  companyId?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IFlag {
  id?: string;
  flag: string;
  type: FlagType;
  labId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface User {
  id?: string;
  gender?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // Optional in both old and new interfaces
  country?: string; // Optional in both old and new interfaces
  imageUrl?: string; // Optional in both old and new interfaces
  isOnline?: boolean; // Added in the new interface, made optional here
  isActive?: boolean; // Added in the new interface, made optional here
  isNew?: boolean; // Added in the new interface, made optional here
  dateOfBirth?: Date; // Added in the new interface, made optional here
  website?: string; // Added in the new interface, made optional here
  points: number; // Kept from the old interface
  bio?: string; // Added in the new interface, made optional here
  expiresAt?: Date; // Added in the new interface, made optional here
  createdAt?: Date; // Optional because it's now in the new interface
  updatedAt?: Date; // Optional because it's now in the new interface
  deletedAt?: Date; // Optional because it's now in the new interface
  Purchase?: any[]; // Made optional since it wasn’t in the old interface
  Events?: any[]; // Made optional
  CaptureTheFlag?: any[]; // Made optional
  JobSubmission?: any[]; // Made optional
  staffOf?: any[]; // Made optional
  ownedTeams?: any[]; // Made optional
  teamMemberships?: any[]; // Made optional

  Business?: any[]; // Made optional
  password?: string; // Removed in the new interface, but kept here for backward compatibility
  rank?: number; // Removed in the new interface, but kept here for backward compatibility
  lastSighnIn?: string; // Removed in the new interface, but kept here for backward compatibility
  notification?: number; // Removed in the new interface, but kept here for backward compatibility
  role?: string; // Removed in the new interface, but kept here for backward compatibility
}

export interface CustomNodeData {
  title: string;
  steps: string[];
  buttonText: string;
  url?: string;
  icon?: string; // base64 string for display
  iconFile?: File; // original file for upload
}

export type CustomNode = Node<CustomNodeData>;

export interface IDiagram {
  nodes: CustomNode[];
  edges: Edge[];
}

// export interface IDiagram {
//   id: string;
//   name: string;
//   description: string;
//   icon?: string;
//   iconFile?: File;
//   url?: string;
//   loading?: boolean;
//   hide?: boolean;
//   children?: IDiagram[];
//   createdAt: Date;
//   updatedAt: Date;
//   // React Flow specific fields
//   position?: { x: number; y: number };
//   type?: string; // e.g., 'default', 'input', 'output', or custom node type
//   parentNode?: string; // for nested nodes in React Flow
//   extent?: 'parent' | 'root'; // for React Flow extent
// }

export interface IInviteUser {
  email: string;
  status: "Accepted" | "Pending";
}

export interface IBusiness {
  id?: string;
  name: string;
  location: string;
  country: string;
  size: number;
  logoUrl?: string;
  industry: string;
  isActive: boolean;
  phone: string;
  email: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  users?: Array<IUser>;
}

export interface ILabSteps {
  id?: string;
  title: string;
  description: string;
  step?: number;
  labId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ISetting {
  tabName: string;
  isLocked: boolean;
}

export type CreatedEvent = Omit<
  IEvent,
  "id" | "users" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  image: any;
};

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}
export enum OSType {
  WINDOWS = "WINDOWS",
  LINUX = "LINUX",
  MACOS = "MACOS",
  OTHER = "OTHER",
}

export enum EventType {
  MeetUp = "MeetUp",
  Hackathon = "Hackathon",
  Online = "Online",
  WorkShop = "WorkShop",
}

export enum Involve {
  TEAM = "TEAM",
  INDIVIDUAL = "INDIVIDUAL",
}

export enum FlagType {
  ROOT = "ROOT",
  USER = "USER",
  ADMINISTRATOR = "ADMINISTRATOR",
  MACHINE = "MACHINE",
}

export enum CloudProvider {
  AWS = "AWS",
  AZURE = "AZURE",
}

export interface Region {
  AWSRegion: string | null;
  AZURERegion: string | null;
  cloudProvider: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  network: string | null;
  securityGroupId: string;
  subnetName: string | null;
  type: string;
  updatedAt: string;
  vnetName: string | null;
}

export interface ICoupon {
  id: string;
  name: string;
  discountType: "amount" | "percentage";
  discountValue: number;
  expiredDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface EventSubmission {
  id: string;
  userId: string;
  eventId: string;
  submittedAt: string; // ISO string for date
}

interface EventCount {
  submissions: number;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  image: string | null;
  location: string;
  startDate: string;
  endDate: string;
  type: string;
  note: string;
  isPublic: boolean;
  isOnline: boolean;
  isPaid: boolean;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  submissions?: EventSubmission[]; // optional, not in this JSON
  _count: EventCount;
}
