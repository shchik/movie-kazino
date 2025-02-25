import { GenreType } from "../../../types/genre-types";
import CheckBox from "../../../UI/checkbox/checkbox";
import s from "./genre.module.scss";

type GenreProps = {
	genre: GenreType;
	selectedGenre: string;
	handleLabelClick: (genre: string) => void;
};

const Genre: React.FC<GenreProps> = ({
	genre,
	selectedGenre,
	handleLabelClick,
}) => {
	return (
		<li className={s.genre} key={genre.id}>
			<div className={s.genre__title}>
				<span>{genre.name}</span>
				<span className={s.genre__count}>({genre.count})</span>
			</div>

			<CheckBox
				genre={genre}
				selectedGenre={selectedGenre}
				handleLabelClick={handleLabelClick}
			/>
		</li>
	);
};

export default Genre;
