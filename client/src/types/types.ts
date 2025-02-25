export interface IUser {
	id: number;
	email: string;
	username: string;
	balance?: number;
}

export interface IAuthForm {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

export interface IUserData {
	email?: string;
	username: string;
	password: string;
}

export interface IResponseUserData {
	access_token: string;
	user: IUser;
}

export type TImages = {
	image: string;
	value: number;
};

export type ImagesResponseType = {
	id: number;
	image: string;
	value: number;
	slotId: number;
};

export type TLenta = {
	id: number;
	images: (TImages | undefined)[];
};
