import { ILab, ILabSteps } from "../types";

export interface ILabProgress {
  id: string;
  userId: string;
  labId: string;
  completed: boolean;
  progress: number;
  isRun: boolean;
  haveAccess: boolean;
  publicIP: string;
  taskArn: string;
  taskId: any;
  completedAt: any;
  createdAt: string;
  updatedAt: string;
  labs: ILabs;
}



export interface ILabs {
  id?: string;
  name: string;
  description: string;
  background: string;
  labImage: string;
  os: string;
  tag: string[];
  difficult: string;
  isActive: true;
  repositoryName: string;
  noSQLID: string;
  price: number;
  point: number;
  createdAt: string;
  labsSteps?: ILabSteps[]
  updatedAt: string;
  timeLimit: number;
  deletedAt?: null;
  packagesId: null;
  labsProgress?: ILabProgress[]
}


export type UpdateLabBody = Partial<ILab> | FormData