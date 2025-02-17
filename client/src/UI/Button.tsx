import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, ...rest }, ref) => {
		return (
			<button ref={ref} {...rest}>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;
