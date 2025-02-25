import { GenreType } from "../../types/genre-types";
import Genre from "./genre/genre";

type GenreListProps = {
	genres: GenreType[];
	selectedGenre: string;
	handleLabelClick: (genre: string) => void;
};

const GenreList: React.FC<GenreListProps> = ({
	genres,
	selectedGenre,
	handleLabelClick,
}) => {
	return genres.map(genre => (
		<Genre
			key={genre.id}
			genre={genre}
			selectedGenre={selectedGenre}
			handleLabelClick={handleLabelClick}
		/>
	));
};

export default GenreList;
