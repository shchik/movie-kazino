import searchImage from "./images/icons/search-icon.png";
import "./main.css";
import RenderMainGrid from "../../components/mainGridComponent/renderMainGrid";
import RenderGenreList from "../../components/genreListComponent/genreListComponent";
import { TGenre, TSlot } from "../../types/types";

type TMain = {
  slots: TSlot[];
  setSlots: React.Dispatch<React.SetStateAction<TSlot[]>>;
  genres: TGenre[];
  onChangeSearchValue: (value: string) => void;
  selectedGenre: string;
  handleLabelClick: (genre: string) => void;
  onLoginClick: () => void;
};

const Main: React.FC<TMain> = ({
  slots,
  setSlots,
  genres,
  onChangeSearchValue,
  selectedGenre,
  handleLabelClick,
  onLoginClick,
}) => {
  return (
    <div className="main-flexbox">
      <div className="sidebar">
        <div className="search-bar">
          <img src={searchImage}></img>
          <input
            placeholder="Провайдеры поискdа"
            onChange={(e) => onChangeSearchValue(e.target.value)}
          ></input>
        </div>
        <ul className="genre-list">
          <RenderGenreList
            genres={genres}
            selectedGenre={selectedGenre}
            handleLabelClick={handleLabelClick}
          />
        </ul>
      </div>

      <div className="main-grid-layout js-main-grid-layout">
        <RenderMainGrid
          slots={slots}
          setSlots={setSlots}
          onLoginClick={onLoginClick}
        />
      </div>
    </div>
  );
};

export default Main;
