import { Injectable } from "@nestjs/common";
import { LoginAuthDto } from "src/auth/dto/login-auth.dto";
import { RegisterAuthDto } from "src/auth/dto/register-auth.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async findUser(data: LoginAuthDto) {
		return await this.prisma.user.findFirst({
			where: {
				username: data.username,
			},
		});
	}

	async createUser(data: RegisterAuthDto) {
		return await this.prisma.user.create({
			data: {
				email: data.email,
				username: data.username,
				password: data.password,
			},
		});
	}

	async getUserByEmail(email: string) {
		return await this.prisma.user.findFirst({
			where: {
				email: email,
			},
		});
	}

	async getUserByUsername(username: string) {
		return await this.prisma.user.findFirst({
			where: {
				username: username,
			},
		});
	}
}
