interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    country: string;
    imageUrl?: string;
    status: boolean;
    dateOfBirth: Date;
    githubUrl?: string;
    linkedinUrl?: string;
    website?: string;
    companyId?: string;
    role?: string;
    company?: Company;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    Purchase: Purchase[];
}

interface Company {
    id: string;
    name: string;
    location: string;
    size: number;
    logoUrl?: string;
    industry: string;
    status: boolean;
    phone: string;
    email: string;
    website?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    users: User[];
}

interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    tag: string;
    level: string;
    imageUrl?: string;
    status: boolean;
    certificate: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    subcourses: SubCourse[];
    Purchase: Purchase[];
}

interface SubCourse {
    id: string;
    title: string;
    description: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    course: Course;
}

interface Purchase {
    id: string;
    userId: string;
    courseId: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    user: User;
    course: Course;
}

