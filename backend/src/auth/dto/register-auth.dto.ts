import { IsEmail, IsString } from "class-validator";

export class RegisterAuthDto {
	@IsEmail()
	email: string;

	@IsString()
	username: string;

	@IsString()
	password: string;
}
