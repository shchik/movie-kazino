import favouritesImage from "./icons/favourites-icon.png";
import likeImage from "./icons/like-icon.png";
import infoImage from "./icons/info-icon.png";
import "./renderMainGrid.css";
import React from "react";
import { Link } from "react-router-dom";

function RenderMainGrid({ slots, setSlots, isAuth, onLoginClick }) {
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
  }

  return slots.map((slot) => (
    <div className="one-slot" key={slot.id}>
      <img src={slot.image} alt="hello" className="slot-image-class"></img>
      <p className="slot-title">{slot.name}</p>
      {isAuth ? (
        <button className="play-button">
          <Link to="/slotPage">Играть</Link>
        </button>
      ) : (
        <button className="play-button" onClick={onLoginClick}>
          <div>Играть</div>
        </button>
      )}

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
      <img src={favouritesImage} alt="hello" className="favourites-icon"></img>
    </div>
  ));
}

export default RenderMainGrid;
