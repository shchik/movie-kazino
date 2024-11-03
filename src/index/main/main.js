import favouritesImage from "./images/icons/favourites-icon.png";
import likeImage from "./images/icons/like-icon.png";
import infoImage from "./images/icons/info-icon.png";
import searchImage from "./images/icons/search-icon.png";
import activeImage from "./images/icons/active-icon.png";
import { slotsPrototype } from "../../data/slot";
import "./main.css";
import React, { useState } from "react";
import { genres } from "../../data/genre";

function Main() {
  const [slots, setSlots] = React.useState(
    JSON.parse(localStorage.getItem("slots")) || slotsPrototype
  );

  const [selectedGenre, setSelectedGenre] = React.useState(null);

  function addLike(slotId, event) {
    if (event.currentTarget.nextElementSibling.style.color === "lightgreen") {
      event.currentTarget.nextElementSibling.style.color = "white";

      setSlots((s) => {
        return slots.map((slot) => {
          if (slot.id === slotId) {
            return { ...slot, likesCount: slot.likesCount - 1 };
          }
          return slot;
        });
      });
      localStorage.setItem("slots", JSON.stringify(slots));
      return;
    }
    event.currentTarget.nextElementSibling.style.color = "lightgreen"; //
    setSlots((s) => {
      return slots.map((slot) => {
        if (slot.id === slotId) {
          return { ...slot, likesCount: slot.likesCount + 1 };
        }
        return slot;
      });
    });
    localStorage.setItem("slots", JSON.stringify(slots));
  }

  function renderMainGrid() {
    return slots.map((slot) => (
      <div className="one-slot" key={slot.id}>
        <img src={slot.image} alt="hello" className="slot-image-class"></img>
        <p className="slot-title">{slot.name}</p>
        <button className="play-button">Играть</button>
        <a>
          <img src={infoImage} alt="hello" className="info-icon"></img>
        </a>
        <div className="likes-class">
          <img
            src={likeImage}
            alt="hello"
            className="like-icon js-like-icon"
            onClick={(event) => addLike(slot.id, event)}
            data-slot-id={slot.id}
          ></img>
          <span className="likes-count js-likes-count">{slot.likesCount}</span>
        </div>
        <img
          src={favouritesImage}
          alt="hello"
          className="favourites-icon"
        ></img>
      </div>
    ));
  }

  function renderGenreList() {
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

  return (
    <div className="main-flexbox">
      <div className="sidebar">
        <div className="search-bar">
          <img src={searchImage}></img>
          <input placeholder="Провайдеры поиска"></input>
        </div>
        <ul className="genre-list">{renderGenreList()}</ul>
      </div>

      <div className="main-grid-layout js-main-grid-layout">
        {renderMainGrid()}
      </div>
    </div>
  );
}

export default Main;
