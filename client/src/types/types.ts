export interface IUser {
  id: number;
  token: string;
  username: string;
}

export interface IUserData {
  email: string;
  username: string;
  password: string;
}

export interface IResponceUser {
  email: string;
  username: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  password: string;
}

export interface IResponseUserData {
  token: string;
  user: IResponceUser;
}
