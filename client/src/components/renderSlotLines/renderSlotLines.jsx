import React from "react";
import "./renderSlotLines.css";
import { CSSTransition } from "react-transition-group";

const RenderSlotLines = ({
  gameState,
  lenta,
  playAnimation,
  isWin,
  winPrice,
}) => {
  return (
    <div className="slot">
      {isWin ? (
        <div className="overlay">
          <div className="background-image-class">
            <div className="win-class">
              <span className="win-price">Ваш выигрыш: {winPrice}$</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {gameState.map((el, index) => {
        const nodeRef = React.useRef(null);

        return (
          <div className="slot-window" key={index}>
            <CSSTransition
              nodeRef={nodeRef}
              in={playAnimation}
              timeout={3000}
              classNames="my-node"
            >
              <div className="lenta-class" ref={nodeRef}>
                {lenta[index].images.map((itemList, ind) => (
                  <img
                    key={ind}
                    src={itemList}
                    className="lenta-image"
                    alt="Hello"
                  />
                ))}
              </div>
            </CSSTransition>

            {playAnimation ? (
              <img
                key={index}
                src={el.value}
                className="lenta-image active-animation"
                alt="Hello"
              />
            ) : (
              <img
                key={index}
                src={el.value}
                className="lenta-image"
                alt="Hello"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RenderSlotLines;
