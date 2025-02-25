import React from "react";
import GenreList from "../../components/genre-list/genre-list";
import { TGenre } from "../../types/types";
import searchImage from "./images/search-icon.png";
import s from "./sidebar.module.scss";

type SidebarProps = {
	genres: TGenre[];
	selectedGenre: string;
	handleLabelClick: (genre: string) => void;
	onChangeSearchValue: (value: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
	genres,
	selectedGenre,
	handleLabelClick,
	onChangeSearchValue,
}) => {
	return (
		<div className={s.sidebar}>
			<div className={s.sidebar__search}>
				<img src={searchImage}></img>
				<input
					placeholder="Провайдеры поиска"
					onChange={e => onChangeSearchValue(e.target.value)}
				></input>
			</div>
			<ul className={s["sidebar__genre-list"]}>
				<GenreList
					genres={genres}
					selectedGenre={selectedGenre}
					handleLabelClick={handleLabelClick}
				/>
			</ul>
		</div>
	);
};

export default Sidebar;
