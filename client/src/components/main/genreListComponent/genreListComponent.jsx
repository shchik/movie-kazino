import React from "react";
import activeImage from "./active-icon.png";
import "./genreListComponent.css";

export default function RenderGenreList({ genres }) {
  const [selectedGenre, setSelectedGenre] = React.useState(null);

  const handleLabelClick = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre);
    }
  };

  return genres.map((genre) => (
    <li className="one-genre" key={genre.id}>
      <div className="genre-title-count">
        <span>{genre.name}</span>
        <span className="one-genre-count">({genre.count})</span>
      </div>

      <input
        type="radio"
        id={genre.id}
        className="input-class"
        checked={selectedGenre === genre.name}
        onChange={() => handleLabelClick(genre.name)}
      ></input>
      <label
        htmlFor={genre.id}
        className="custom-label"
        onClick={() => handleLabelClick(genre.name)}
      >
        <img
          src={activeImage}
          style={{ opacity: selectedGenre === genre.name ? 1 : 0 }}
        ></img>
      </label>
    </li>
  ));
}
