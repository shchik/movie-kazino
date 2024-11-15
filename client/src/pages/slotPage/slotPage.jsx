import "./slotPage.css";
import RenderSlotLines from "../../components/renderSlotLines/renderSlotLines.jsx";
import image1 from "./images/1.png";
import image2 from "./images/2.png";
import image5 from "./images/5.png";
import image10 from "./images/10.png";
import devkaImage from "./images/devka.jpg";
import johnImage from "./images/john.jfif";
import negrImage from "./images/negr.jpg";
import spinImage from "./images/spin.png";
import React from "react";

import { CSSTransition } from "react-transition-group";

export default function SlotPage() {
  const lenta = [
    {
      id: 1,
      images: [
        image1,
        image2,
        image5,
        image10,
        devkaImage,
        johnImage,
        negrImage,
      ],
    },
    {
      id: 2,
      images: [
        image1,
        image2,
        image5,
        image10,
        devkaImage,
        johnImage,
        negrImage,
      ],
    },
    {
      id: 3,
      images: [
        image1,
        image2,
        image5,
        image10,
        devkaImage,
        johnImage,
        negrImage,
      ],
    },
  ];

  const images = [
    image1,
    image2,
    image5,
    image10,
    devkaImage,
    johnImage,
    negrImage,
  ];

  const [gameState, setGameState] = React.useState([]);
  const [playAnimation, setPlayAnimation] = React.useState(false);

  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const initialImages = lenta.map(() => ({
      value: images[0],
    }));
    setGameState(initialImages);
  }, []);

  React.useEffect(() => {
    if (gameState.length < 3) return;
    if (
      gameState[0].value === gameState[1].value &&
      gameState[0].value === gameState[2].value &&
      gameState[0].value === devkaImage
    ) {
      alert("Бонуска!");
    } else if (
      gameState[0].value === gameState[1].value &&
      gameState[0].value === gameState[2].value
    ) {
      alert("Найс!");
    }
  }, [gameState]);

  const greaterThan = ">";
  const lessThan = "<";

  const [balance, setBalance] = React.useState(300);
  const [bet, setBet] = React.useState(0.5);

  const handleLessButton = () => {
    if (bet === 0.5) return;
    setBet(bet / 2);
  };
  const handleMoreButton = () => {
    if (bet === 8) return;
    setBet(bet * 2);
  };
  const handleMaxButton = () => {
    setBet(8);
  };
  const handleSpinButton = () => {
    if (balance < bet) return;
    setBalance(balance - bet);
    setPlayAnimation(true);
    setTimeout(() => {
      setPlayAnimation(false);
    }, 1000);

    setGameState(
      lenta.map((el, index) => {
        return {
          value: el.images[Math.floor(Math.random() * images.length)],
        };
      })
    );
  };

  return (
    <div className="slot-container">
      <RenderSlotLines
        gameState={gameState}
        lenta={lenta}
        playAnimation={playAnimation}
      />
      <div className="slot-panel">
        <div className="auto-spin-class">
          <button className="auto-spin-button">Auto-Spin</button>
        </div>
        <dic className="max-bet-class">
          <button className="max-bet-button" onClick={handleMaxButton}>
            MaxBet
          </button>
        </dic>
        <div className="spin-button-class">
          <button className="spin-button" onClick={handleSpinButton}>
            <img src={spinImage} className="spin-image"></img>
          </button>
        </div>
        <div className="bet-class">
          <p className="bet-amount">{bet}$</p>
          <div className="bet-buttons">
            <button className="less-than" onClick={handleLessButton}>
              {lessThan}
            </button>
            <button className="more-than" onClick={handleMoreButton}>
              {greaterThan}
            </button>
          </div>
        </div>
        <span className="cash-class">{balance}$</span>
      </div>
    </div>
  );
}
