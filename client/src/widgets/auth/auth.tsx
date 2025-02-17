import React from "react";
import { toast } from "react-toastify";
import { context } from "../../context.js";
import { setTokenToLocalStorage } from "../../helpers/localstorage.helper.js";
import { AuthService } from "../../services/auth.service.js";
import { useAppDispatch } from "../../store/hooks.js";
import { login } from "../../store/user/userSlice.js";
import { IResponseUserData, IUser } from "../../types/types.js";

type AuthFormProps = {
	onLoginClick: () => void;
	isLoginned: boolean;
};

const AuthForm: React.FC<AuthFormProps> = ({ onLoginClick, isLoginned }) => {
	const contextValue = React.useContext(context);

	const [isLogin, setIsLogin] = React.useState(isLoginned);
	const dispatch = useAppDispatch();

	const [email, setEmail] = React.useState<string>("");
	const [username, setUsername] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const [confirmPassword, setConfirmPassword] = React.useState<string>();

	const registrationHandler = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		try {
			e.preventDefault();
			const data: IResponseUserData | undefined =
				await AuthService.registration({
					email: email,
					username: username,
					password: password,
				});
			if (data) {
				contextValue.setIsAuth(true);
				toast.success("Account has been created!");
				onLoginClick();
			}
		} catch (err: any) {
			const error: string = err.response?.data.message;
			toast.error(error);
		}
	};

	const loginHandler = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		try {
			e.preventDefault();
			const data: IUser | undefined = await AuthService.login({
				email: email,
				username: username,
				password: password,
			});
			if (data) {
				contextValue.setIsAuth(true);
				setTokenToLocalStorage("token", data.token);
				dispatch(login(data));
				toast.success("You entered the account!");
				onLoginClick();
			}
		} catch (err: any) {
			const error: string = err.response?.data.message;
			toast.error(error);
		}
	};

	return (
		<div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white w-1/4 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl content-form">
			<button
				className="absolute top-2 right-5 bg-red-500 px-1.5 hover:shadow-3xl"
				onClick={onLoginClick}
			>
				X
			</button>
			<h1 className="my-5 text-center text-xl ">
				{isLogin ? "Login" : "Registration"}
			</h1>

			<form
				className="flex w-2/3 flex-col gap-5"
				onSubmit={isLogin ? loginHandler : registrationHandler}
			>
				<input
					type={isLogin ? "text" : "email"}
					className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1"
					placeholder={isLogin ? "Username" : "Email"}
					onChange={e =>
						isLogin
							? setUsername(e.target.value)
							: setEmail(e.target.value)
					}
				></input>
				{isLogin ? (
					""
				) : (
					<input
						type="text"
						className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1"
						placeholder="Username"
						onChange={e => setUsername(e.target.value)}
					></input>
				)}
				<input
					type="password"
					className="input focus:outline-none  bg-transparent border-2 border-solid border-slate-500 rounded p-1"
					placeholder="Password"
					onChange={e => setPassword(e.target.value)}
				></input>

				{isLogin ? (
					""
				) : (
					<input
						type="password"
						className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1"
						placeholder="Confirm Password"
						onChange={e => setConfirmPassword(e.target.value)}
					></input>
				)}

				<button className="btn bg-green-600 mx-auto py-2 px-6 rounded hover:shadow-3xl">
					{isLogin ? "Login" : "Registration"}
				</button>
			</form>

			<div className="mt-5 flex justify-center">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white my-2"
					>
						Don't have an account?
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white my-2"
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	);
};

export default AuthForm;
