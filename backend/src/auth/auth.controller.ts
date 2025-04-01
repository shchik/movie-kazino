import {
	Body,
	Controller,
	HttpCode,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { RegisterAuthDto } from "./dto/register-auth.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async login(
		@Body() data: LoginAuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { user, tokens } = await this.authService.login(data);

		this.authService.addRefreshTokenToResponse(res, tokens.refreshToken);

		const { accessToken } = tokens;

		return {
			user,
			accessToken,
		};
	}

	@Post("register")
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	async register(
		@Body() data: RegisterAuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { user, tokens } = await this.authService.register(data);

		this.authService.addRefreshTokenToResponse(res, tokens.refreshToken);

		const { accessToken } = tokens;

		return {
			user,
			accessToken,
		};
	}

	@Post("logout")
	@HttpCode(200)
	async logout(@Res({ passthrough: true }) response: Response) {
		this.authService.removeRefreshTokenFromResponse(response);
		return true;
	}

	@Post("access-token")
	@HttpCode(200)
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies =
			req.cookies[this.authService.REFRESH_TOKEN_NAME];

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenFromResponse(res);
			throw new UnauthorizedException("Refresh token didn't pass!");
		}

		const { tokens, user } = await this.authService.getNewTokens(
			refreshTokenFromCookies
		);

		this.authService.addRefreshTokenToResponse(res, tokens.refreshToken);
		const { accessToken } = tokens;

		return {
			user,
			accessToken,
		};
	}
}
