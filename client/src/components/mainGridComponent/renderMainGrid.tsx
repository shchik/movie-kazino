import favouritesImage from "../../images/components/mainGrid/favourites-icon.png";
import likeImage from "../../images/components/mainGrid/like-icon.png";
import infoImage from "../../images/components/mainGrid/info-icon.png";
import "./renderMainGrid.css";
import { SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";
import { context } from "../../context";
import { TSlot } from "../../types/types";

type TRenderMainGrid = {
  slots: TSlot[];
  setSlots: React.Dispatch<SetStateAction<TSlot[]>>;
  onLoginClick: () => void;
};

const RenderMainGrid: React.FC<TRenderMainGrid> = ({
  slots,
  setSlots,
  onLoginClick,
}) => {
  const contextValue = useContext(context);

  function addLike(
    slotId: number,
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ): void {
    const likeCountElement = event.currentTarget
      .nextElementSibling as HTMLElement;

    if (likeCountElement.style.color === "lightgreen") {
      likeCountElement.style.color = "white";

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
    likeCountElement.style.color = "lightgreen"; //
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
      {contextValue.isAuth ? (
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
};

export default RenderMainGrid;
