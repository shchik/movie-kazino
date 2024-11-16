import React from "react";
import "./renderSlotLines.css";
import { CSSTransition } from "react-transition-group";

const RenderSlotLines = ({ gameState, lenta, playAnimation }) => {
  return (
    <div className="slot">
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
                  <img key={ind} src={itemList} className="lenta-image" />
                ))}
              </div>
            </CSSTransition>

            <img key={index} src={el.value} className="lenta-image" />
          </div>
        );
      })}
    </div>
  );
};

export default RenderSlotLines;
