import { GenreType } from "../../types/genre-types";
import activeImage from "./active-icon.png";
import s from "./checkbox.module.scss";

type CheckBoxTypes = {
	genre: GenreType;
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
				checked={selectedGenre === genre.name}
				readOnly
			></input>
			<label
				htmlFor={genre.name}
				onClick={() => handleLabelClick(genre.name)}
			>
				<img
					src={activeImage}
					style={{ opacity: selectedGenre === genre.name ? 1 : 0 }}
				></img>
			</label>
		</div>
	);
};

export default CheckBox;
