import favouritesImage from "./images/icons/favourites-icon.png";
import likeImage from "./images/icons/like-icon.png";
import infoImage from "./images/icons/info-icon.png";
import searchImage from "./images/icons/search-icon.png";
import activeImage from "./images/icons/active-icon.png";
import { slotsPrototype } from "../../data/slot";
import "./main.css";
import React, { useState } from "react";

function Main() {
  const [slots, setSlots] = React.useState(
    JSON.parse(localStorage.getItem("slots")) || slotsPrototype
  );

  function addLike(slotId, event) {
    if (event.currentTarget.nextElementSibling.style.color === "lightgreen") {
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

  return (
    <div className="main-flexbox">
      <div className="sidebar">
        <div className="search-bar">
          <img src={searchImage}></img>
          <input placeholder="Провайдеры поиска"></input>
        </div>
        <ul className="genre-list">
          <li className="one-genre">
            <span>Драма</span>
            <input type="radio" id="drama" className="input-class"></input>
            <label for="drama" class="custom-label">
              <img src={activeImage}></img>
            </label>
          </li>
          <li className="one-genre">
            <span>Комедия</span>
            <input type="radio" id="comedy"></input>
            <label for="comedy" class="custom-label">
              <img src={activeImage}></img>
            </label>
          </li>
          <li className="one-genre">
            <span>Боевик</span>
            <input type="radio" id="boevic"></input>
            <label for="boevic" class="custom-label">
              <img src={activeImage}></img>
            </label>
          </li>
          <li className="one-genre">
            <span>Триллер</span>
            <input type="radio" id="triller"></input>
            <label for="triller" class="custom-label">
              <img src={activeImage}></img>
            </label>
          </li>
          <li className="one-genre">
            <span>Хоррор</span>
            <input type="radio" id="horror"></input>
            <label for="horror" class="custom-label">
              <img src={activeImage}></img>
            </label>
          </li>
          <li className="one-genre">
            <span>Фантастика</span>
            <input type="radio" id="fantasy"></input>
            <label for="fantasy" class="custom-label">
              <img src={activeImage}></img>
            </label>
          </li>
        </ul>
      </div>

      <div className="main-grid-layout js-main-grid-layout">
        {renderMainGrid()}
      </div>
    </div>
  );
}

export default Main;
