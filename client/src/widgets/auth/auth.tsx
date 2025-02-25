import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/auth/useAuth";
import { IAuthForm } from "../../types/types";

type AuthFormProps = {
	setIsAuthFormVisible: React.Dispatch<SetStateAction<boolean>>;
	setIsAuth: React.Dispatch<SetStateAction<boolean>>;
};

const AuthForm: React.FC<AuthFormProps> = ({
	setIsAuthFormVisible,
	setIsAuth,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IAuthForm>({
		mode: "onChange",
	});

	const [isLogin, setIsLogin] = React.useState(true);

	const authUser = useAuth(isLogin ? "login" : "register");

	const password = watch("password");

	const onSubmit: SubmitHandler<IAuthForm> = formData => {
		const data = {
			email: formData.email,
			username: formData.username,
			password: formData.password,
		};

		authUser(data, {
			onSuccess() {
				setIsAuthFormVisible(false);
				setIsAuth(true);
			},
		});
	};

	return (
		<div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white w-1/4 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl z-[1000]">
			<button
				className="absolute top-2 right-5 bg-red-500 px-1.5 hover:shadow-3xl"
				onClick={() => setIsAuthFormVisible(false)}
			>
				X
			</button>
			<h1 className="my-5 text-center text-xl ">
				{isLogin ? "Login" : "Registration"}
			</h1>

			<form
				className="flex w-2/3 flex-col gap-5"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					{isLogin ? (
						""
					) : (
						<input
							type="email"
							placeholder="Email"
							className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1 w-full"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^\S+@\S+\.\S+$/,
									message: "Invalid email address",
								},
							})}
						/>
					)}
					{errors.email && (
						<p className="text-red-600">{errors.email.message}</p>
					)}
				</div>

				<div>
					<input
						type="text"
						className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1 w-full"
						placeholder="Username"
						{...register("username", {
							required: "Username is required!",
							minLength: {
								value: 3,
								message:
									"Username must contain at least 3 letters",
							},
						})}
					></input>
					{errors.username && (
						<p className="text-red-600">
							{errors.username.message}
						</p>
					)}
				</div>

				<div>
					<input
						type="password"
						className="input focus:outline-none  bg-transparent border-2 border-solid border-slate-500 rounded p-1 w-full"
						placeholder="Password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 5,
								message:
									"Password must contain at least 5 letters",
							},
						})}
					></input>
					{errors.password && (
						<p className="text-red-600">
							{errors.password.message}
						</p>
					)}
				</div>

				<div>
					{isLogin ? (
						""
					) : (
						<input
							type="password"
							className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1 w-full"
							placeholder="Confirm Password"
							{...register("confirmPassword", {
								validate: (value: string) =>
									value === password ||
									"Passwords do not match",
							})}
						></input>
					)}
					{errors.confirmPassword && (
						<p className="text-red-600">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>

				<button
					className="btn bg-green-600 mx-auto py-2 px-6 rounded hover:shadow-3xl"
					type="submit"
				>
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
