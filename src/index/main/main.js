import favouritesImage from "./images/icons/favourites-icon.png";
import likeImage from "./images/icons/like-icon.png";
import infoImage from "./images/icons/info-icon.png";
import { slots } from "../../data/slot";
import "./main.css";

function Main() {
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
          <img src={likeImage} alt="hello" className="like-icon"></img>
          <span className="likes-count">433</span>
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
      <div className="search-sidebar"></div>

      <div className="main-grid-layout js-main-grid-layout">
        {renderMainGrid()}
      </div>
    </div>
  );
}

export default Main;
