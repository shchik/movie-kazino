import React from "react";
import activeImage from "./active-icon.png";
import "./genreListComponent.css";

export default function RenderGenreList({
  genres,
  selectedGenre,
  handleLabelClick,
}) {
  return genres.map((genre) => (
    <li className="one-genre" key={genre.id}>
      <div className="genre-title-count">
        <span>{genre.name}</span>
        <span className="one-genre-count">({genre.count})</span>
      </div>

      <input
        type="checkbox"
        id={genre.id}
        className="input-class"
        checked={selectedGenre === genre.id}
        readOnly
      ></input>
      <label
        htmlFor={genre.id}
        className="custom-label"
        onClick={() => handleLabelClick(genre.id)}
      >
        <img
          src={activeImage}
          style={{ opacity: selectedGenre === genre.id ? 1 : 0 }}
        ></img>
      </label>
    </li>
  ));
}
