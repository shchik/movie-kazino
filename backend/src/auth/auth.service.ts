import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { Response } from "express";
import { UserService } from "src/user/user.service";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDto } from "./dto/register-auth.dto";

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1;
	REFRESH_TOKEN_NAME = "refresh_token";

	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async login(data: LoginAuthDto) {
		const userData = await this.userService.findUser(data);

		if (!userData) throw new UnauthorizedException("Invalid username");

		if (!(await argon.verify(userData.password, data.password)))
			throw new UnauthorizedException("Wrong password!");

		const { password, ...user } = userData;

		const payload = { id: user.id, username: user.username };
		const tokens = this.issueTokens(payload);

		return {
			user,
			tokens,
		};
	}

	async register(data: RegisterAuthDto) {
		const existingEmail = await this.userService.getUserByEmail(data.email);
		const existingUsername = await this.userService.getUserByUsername(
			data.username
		);

		if (existingEmail || existingUsername)
			throw new Error("User with this data already exists!");

		const { password, ...user } = await this.userService.createUser(data);
		const payload = { id: user.id, username: user.username };
		const tokens = this.issueTokens(payload);

		return {
			user,
			tokens,
		};
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwtService.verifyAsync(refreshToken, {
			secret: process.env.JWT_SECRET,
		});

		if (!result) throw new UnauthorizedException("Invalid refresh token");

		const { password, ...user } = await this.userService.getUserByUsername(
			result.username
		);

		const tokens = this.issueTokens({
			id: user.id,
			username: user.username,
		});

		return {
			user,
			tokens,
		};
	}

	issueTokens(payload: { id: number; username: string }) {
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: "1h",
		});
		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: "1d",
		});

		return { accessToken, refreshToken };
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date();
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: "localhost",
			expires: expiresIn,
			secure: true,
			sameSite: "none",
		});
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, "", {
			httpOnly: true,
			domain: "localhost",
			expires: new Date(0),
			secure: true,
			sameSite: "none",
		});
	}
}
