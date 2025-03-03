import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { saveTokenStorage } from "../../services/auth-token.service";
import { AuthService } from "../../services/auth.service";
import { IUserData } from "../../types/types";

export const useAuth = (type: "login" | "register") => {
	const { mutate: authUser } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (formData: IUserData) =>
			AuthService.authUser(type, {
				email: formData.email,
				username: formData.username,
				password: formData.password,
			}),
		onSuccess(data) {
			toast.success("Authorization succeed!");
			console.log(data);
			saveTokenStorage(data!.accessToken);
		},
		onError() {
			toast.error("Authorization failed!");
		},
	});

	return authUser;
};
