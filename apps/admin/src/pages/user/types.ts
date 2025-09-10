// types.ts

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  isActive: boolean;
  isNew: boolean;
  isOnline: boolean;
  points: number;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  deletedAt: string | null;
  expiresAt: string | null;
  bio: string | null;
  dateOfBirth: string | null;
  phone: string | null;
  website: string | null;
  imageUrl: string | null;
}

