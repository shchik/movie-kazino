import axios, { CreateAxiosDefaults } from "axios";
import {
	getAccessToken,
	removeAccessToken,
} from "../services/auth-token.service";
import { AuthService } from "../services/auth.service";

const options: CreateAxiosDefaults = {
	baseURL: "http://localhost:8080/api",
	headers: {
		"Content-Type": "application/json",
		withCredentials: true,
	},
};

const axiosClassic = axios.create(options);

const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
	const access_token = getAccessToken();
	if (config.headers && access_token)
		config.headers.Authorization = `Bearer ${access_token}`;

	return config;
});

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				await AuthService.getNewTokens();
				return axiosWithAuth.request(originalRequest);
			} catch (error) {
				removeAccessToken();
			}
		}
	}
);

export { axiosClassic, axiosWithAuth };
