export interface LoginType {
  userData: UserData;
  ip: string;
  headers?: any;
}

export interface UserData {
  email: string;
  password: string;
}
