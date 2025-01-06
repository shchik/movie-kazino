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

export type TSlot = {
  id: number;
  image: string;
  name: string;
  categories: string[];
  likesCount: number;
};

export type TGenre = {
  id: string;
  name: string;
  count: number;
};

export type TImages = {
  image: string;
  value: number;
};

export type TLenta = {
  id: number;
  images: (TImages | undefined)[];
};
