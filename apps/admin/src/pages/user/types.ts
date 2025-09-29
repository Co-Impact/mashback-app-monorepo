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
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null;
  expiresAt: string | null;
  bio: string | null;
  dateOfBirth: string | null;
  phone: string | null;
  website: string | null;
  imageUrl: string | null;
  Events: UserEvent[];
}

interface UserEvent {
  id: string;
  userId: string;
  eventId: string;
  submittedAt: string;
  Events: EventDetails;
}

interface EventDetails {
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
}
