type InputProps = {
	type: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
	type,
	placeholder,
	onChange,
	...rest
}) => {
	return (
		<input
			type={type}
			className="input focus:outline-none bg-transparent border-2 border-solid border-slate-500 rounded p-1"
			placeholder={placeholder}
			onChange={onChange}
			{...rest}
		></input>
	);
};

export default Input;
