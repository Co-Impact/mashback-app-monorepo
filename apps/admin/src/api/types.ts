import { Edge, Node } from "reactflow";

export interface ICourses {
  id: string;
  title: string;
  description: string;
  price: number;
  tag: string;
  difficult: Difficulty;
  imageUrl?: string;
  certificate: boolean;
  subCourses?: Array<ISubCourse>;
}
export interface ISubCourse {
  id?: string;
  title: string;
  description: string;
  courseId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

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

export interface Income {
  id: number;
  invoiceNumber: string;     // e.g., "#24112"
  customer: string;          // Who paid you
  total: number;             // Total invoice amount
  status: "Paid" | "Overdue" | "Unpaid";
  amountReceived: number;    // Actual received amount (Total - Amount Due)
  amountDue: number;         // Outstanding amount
  dateReceived: string;      // e.g., "2024-12-12"
}


export interface Outcome {
  id: number;
  vendor: string;            // Who you paid (e.g., landlord, supermarket)
  category: string;          // Type of expense (e.g., Rent, Food)
  total: number;             // Total amount spent
  paymentMethod: "Cash" | "Card" | "Bank Transfer" | "Other";
  dateSpent: string;         // e.g., "2025-06-15"
  notes?: string;
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
  phone?: string;  // Optional in both old and new interfaces
  country?: string;  // Optional in both old and new interfaces
  imageUrl?: string;  // Optional in both old and new interfaces
  isOnline?: boolean;  // Added in the new interface, made optional here
  isActive?: boolean;  // Added in the new interface, made optional here
  isNew?: boolean;  // Added in the new interface, made optional here
  dateOfBirth?: Date;  // Added in the new interface, made optional here
  website?: string;  // Added in the new interface, made optional here
  points: number;  // Kept from the old interface
  bio?: string;  // Added in the new interface, made optional here
  expiresAt?: Date;  // Added in the new interface, made optional here
  createdAt?: Date;  // Optional because it's now in the new interface
  updatedAt?: Date;  // Optional because it's now in the new interface
  deletedAt?: Date;  // Optional because it's now in the new interface
  
  // Relations (new fields from the updated interface)
  Purchase?: any[];  // Made optional since it wasn’t in the old interface
  Events?: any[];  // Made optional
  CaptureTheFlag?: any[];  // Made optional
  JobSubmission?: any[];  // Made optional
  staffOf?: any[];  // Made optional
  ownedTeams?: any[];  // Made optional
  teamMemberships?: any[];  // Made optional
  courseHistories?: any[];  // Made optional
  labsHistories?: any[];  // Retained from the old interface (should be kept as is)
  CTFHistories?: any[];  // Made optional
  Package?: any[];  // Made optional
  Business?: any[];  // Made optional
  CourseCertificate?: any[];  // Made optional
  LabCertificate?: any[];  // Made optional
  submitFlags?: any[];  // Made optional
  socialAccounts?: any[];  // Made optional

  // Old interface specific fields (that are no longer in the new one)
  username?: string;  // Removed in the new interface, but kept here for backward compatibility
  password?: string;  // Removed in the new interface, but kept here for backward compatibility
  rank?: number;  // Removed in the new interface, but kept here for backward compatibility
  lastSighnIn?: string;  // Removed in the new interface, but kept here for backward compatibility
  notification?: number;  // Removed in the new interface, but kept here for backward compatibility
  role?: string;  // Removed in the new interface, but kept here for backward compatibility
}

export interface ILab {
  id?: string;
  name: string;
  description: string;
  os: OSType;
  tag: string[];
  price: number;
  timeLimit: number;
  ports: Array<number>;
  package?: string;
  point: number;
  difficult: Difficulty;
  attachment: Array<string>;
  isActive: boolean;
  flag?: Array<Partial<IFlag>>;
  type: LabType;
  labsSteps: Array<ILabSteps>;
  openBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  labImage?: string;
  background?: string;
  repositoryName?: string;
  diagram?:IDiagram|null;
  noSQLID?: string;
  cloudProvider: CloudProvider;
  region?: string;
  labsProgress?: Array<unknown>;
  CaptureTheFlag?: string;
  ctfId?: string;
  labGroups?: Array<unknown>;
  LabCertificate?: Array<unknown>;
  packagesId?: string;
  submittedFlags?: Array<unknown>;
  azureImage?: string;
}

export interface CustomNodeData {
  title: string;
  steps: string[];
  buttonText: string;
  url?: string;
  icon?: string; // base64 string for display
  iconFile?: File; // original file for upload
}


export interface ICaptureTheFlag {
  id: string;
  name: string;
  description: string;
  expiresAt?: Date
  points: number;
  difficulty: Difficulty;
  userDetailsId?: string;
  isActive: boolean;
  azureImage?:string;
  startDate?: Date;
  endDate?: Date;
  reqiresRegistration?: boolean;
  requiredPoints?: number;
  involve?: Involve|'';
  prizes?: Array<IPrize>;
  diagram: IDiagram|null;
  lab?: ILab[];
  ActiveCTF: ActiveCTF[];
}

type Prize = {
  place: number;
  prize: string;
};

interface ActiveCTF {
  id: string;
  name: string;
  isPublic: boolean;
  involve?: Involve; 
  prize: Prize[]; 
  roles: any[]; 
  requiresRegistration: boolean;
  maxParticipants?: number;
  startDate: string;
  endDate: string;
  ctfId: string;
  businessId?: string;
  business?: any;
  CaptureTheFlag?: ICaptureTheFlag;
  createdAt: string;
  updatedAt: string;
  ActiveCTFParticipants: any[];
  TeamParticipants: any[];
}


export interface CustomNode extends Node<CustomNodeData> {}


export interface IDiagram {
  nodes: CustomNode[];
  edges: Edge[]
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
    email:string;
    status: 'Accepted' | 'Pending'
}


export interface IPrize {
  title: string;      
  description: string; 
  amount: number;      
}

export type CreateLabs = Omit<
  ILab,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  attachment: [];
  isCtf: boolean;
  packages: string[];
};

export type CreateCTF = Omit<
  ICaptureTheFlag,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  attachment: [];
};


export interface IBlog {}

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
  step?:number;
  labId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IPackages {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  isBasePackage: boolean;
  features: Features[];
  settings: Record<string, {name: string, value: boolean}[]>;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ISetting {
  tabName: string;
  isLocked: boolean;
}

export interface Features {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  price: number;
  packagesId?: string;
  package?: IPackages;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  settings?: {settings:{id: string, name: string, isActive: boolean}[]}
}

export interface GetRunCtfByIdResponse {
  id: string;
  name: string;
  isPublic: boolean;
  prize: any[]; // adjust if prize has a specific structure
  requiresRegistration: boolean;
  maxParticipants?: number;
  startDate: string; // or Date if you're not serializing
  endDate: string;
  ctfId: string;
  createdAt: string;
  updatedAt: string;
  involve: typeof Involve;

  CaptureTheFlag: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    points: number;
    price?: number;
    requiredPoints: number;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD'; // adjust based on enum
    azureImage?: string;
    diagram?: any;
    settings?: any;
    
    // only selected here
    lab: any[]; // you can replace with Lab[] if you have a Lab interface
    _count: {
      lab: number;
    };
  };

  ActiveCTFParticipants: {
    id: string;
    joinedAt: string;
    progress: number;
    completed: boolean;
    score: number;
    activeCtfId: string;
    userId: string;
    User: {
      id: string;
      // add fields if `UserDetails` is fetched with more fields
    };
  }[];

  _count: {
    ActiveCTFParticipants: number;
  };
}

export type CreatedEvent = Omit<
  IEvent,
  "id" | "users" | "createdAt" | "updatedAt" | "deletedAt"
> & {
  image: any;
};

export interface CreateLabSteps
  extends Omit<
    ILabSteps,
    "id" | "labId" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

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
export enum LabType {
  RedTeam = "RedTeam",
  BlueTeam = "BlueTeam",
  PurpleTeam = "PurpleTeam",
  Cloud = "Cloud",
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
  discountType: 'amount' | 'percentage';
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


