import React from "react";
import "./renderSlotLines.css";
import { CSSTransition } from "react-transition-group";

const RenderSlotLines = ({
  gameState,
  lenta,
  playAnimation,
  isWin,
  winPrice,
  isBonusGame,
  bonusSpins,
  bonusDocs,
  setBonusDocs,
  bonusImage,
  isBonusEnd,
  setIsBonusEnd,
  bonusWin,
}) => {
  const handleBonusDocs = () => {
    setBonusDocs(false);
  };
  const handleEndBonus = () => {
    setIsBonusEnd(false);
  };

  return (
    <div className="slot">
      {isBonusEnd ? (
        <div className="overlay">
          <div className="background-image-bonus">
            <div className="bonus-class">
              <span className="bonus">
                Вы выиграли {bonusWin} за эту бонусную игру!
              </span>
              <div className="bonus-image-class">
                <span className="bonus">Ваша бонусная картинка:</span>
                <img src={bonusImage} className="bonus-image"></img>
              </div>
              <button className="bonus-button" onClick={handleEndBonus}>
                Закончить бонуску
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {bonusDocs ? (
        <div className="overlay">
          <div className="background-image-bonus">
            <div className="bonus-class">
              <span className="bonus">
                Вы выиграли бонусную игру! Вам даётся 10 бесплатных спинов с
                бонусами!
              </span>
              <div className="bonus-image-class">
                <span className="bonus">Ваша бонусная картинка:</span>
                <img src={bonusImage} className="bonus-image"></img>
              </div>
              <button className="bonus-button" onClick={handleBonusDocs}>
                Начать бонуску
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
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
      {isBonusGame ? (
        <div className="bonus-game">
          <span className="bonus-text">
            Количество бонусных вращений: {bonusSpins}
          </span>
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
                    src={itemList.image}
                    className="lenta-image"
                    alt="Hello"
                  />
                ))}
              </div>
            </CSSTransition>

            {playAnimation ? (
              <img
                key={index}
                src={el.image}
                className="lenta-image active-animation"
                alt="Hello"
              />
            ) : (
              <img
                key={index}
                src={el.image}
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
