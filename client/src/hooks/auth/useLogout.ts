import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { removeAccessToken } from "../../services/auth-token.service";
import { AuthService } from "../../services/auth.service";

export const useLogout = () => {
	const { mutate: logout } = useMutation({
		mutationKey: ["logout"],
		mutationFn: async () => {
			const data = await AuthService.logout();
			if (data) removeAccessToken();
		},
		onSuccess() {
			toast.success("You successfully left!");
		},
	});

	return logout;
};
