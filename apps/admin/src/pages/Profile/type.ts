export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BusinessProfileProps {
  id: string;
  name: string;
  location: string;
  size: number;
  logoUrl?: string;
  industry: string;
  isActive: boolean;
  phone: string;
  email: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  users: User[];
}
