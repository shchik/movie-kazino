import searchImage from "./images/icons/search-icon.png";
import { slotsPrototype } from "../../data/slot.js";
import "./main.css";
import React from "react";
import { genres } from "../../data/genre";
import RenderMainGrid from "./mainGridComponent/renderMainGrid";
import RenderGenreList from "./genreListComponent/genreListComponent";

function Main() {
  React.useEffect(() => {
    genres.forEach((genre) => {
      slotsPrototype.forEach((slot) => {
        slot.categories.forEach((category) => {
          if (category === genre.id) {
            genre.count++;
          }
        });
      });
    });
  }, []);

  return (
    <div className="main-flexbox">
      <div className="sidebar">
        <div className="search-bar">
          <img src={searchImage}></img>
          <input placeholder="Провайдеры поиска"></input>
        </div>
        <ul className="genre-list">
          <RenderGenreList genres={genres} slots={slotsPrototype} />
        </ul>
      </div>

      <div className="main-grid-layout js-main-grid-layout">
        <RenderMainGrid slots={slotsPrototype} />
      </div>
    </div>
  );
}

export default Main;
