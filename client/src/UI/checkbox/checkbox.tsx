import { TGenre } from "../../types/types";
import activeImage from "./active-icon.png";
import s from "./checkbox.module.scss";

type CheckBoxTypes = {
	genre: TGenre;
	selectedGenre: string;
	handleLabelClick: (genre: string) => void;
};

const CheckBox: React.FC<CheckBoxTypes> = ({
	genre,
	selectedGenre,
	handleLabelClick,
}) => {
	return (
		<div className={s.checkbox}>
			<input
				type="checkbox"
				id={genre.id}
				checked={selectedGenre === genre.id}
				readOnly
			></input>
			<label
				htmlFor={genre.id}
				onClick={() => handleLabelClick(genre.id)}
			>
				<img
					src={activeImage}
					style={{ opacity: selectedGenre === genre.id ? 1 : 0 }}
				></img>
			</label>
		</div>
	);
};

export default CheckBox;
