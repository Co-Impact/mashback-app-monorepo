export interface IUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  university: string;
  studyField: string;
  password: string;
  company?: string;
  position?: string;
}

export interface SignupType {
  userData: IUser;
  ip: string;
  headers?: any;
}
