import { TGenre } from "../../types/types";
import Genre from "./genre/genre";

type GenreListProps = {
	genres: TGenre[];
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
			genre={genre}
			selectedGenre={selectedGenre}
			handleLabelClick={handleLabelClick}
		/>
	));
};

export default GenreList;
