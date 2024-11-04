import React from "react";
import activeImage from "./active-icon.png";
import "./genreListComponent.css";

export default function RenderGenreList(props) {
  const genres = props.genres;
  const [selectedGenre, setSelectedGenre] = React.useState(null);

  const handleLabelClick = (genre) => {
    console.log(selectedGenre);
    console.log(genre);
    if (selectedGenre === genre) {
      console.log("setted");
      setSelectedGenre(null);
    } else {
      setSelectedGenre((g) => genre);
    }
  };

  return genres.map((genre) => (
    <li className="one-genre" key={genre.id}>
      <span>{genre.name}</span>
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
