import {
	getAccessToken,
	saveTokenStorage,
} from "../services/auth-token.service";
import { AuthService } from "../services/auth.service";

export const checkAuth = async () => {
	if (getAccessToken()) return true;
	const data = await AuthService.getNewTokens();
	if (data) {
		saveTokenStorage(data.access_token);
		return true;
	}

	return false;
};
