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

const greaterThan = ">";
const lessThan = "<";

function createImagesArray() {
  return images.map((image, index) => {
    let a = Math.random() * 100;
    if (a < 30) return image1;
    else if (a < 50 && a >= 30) return image2;
    else if (a < 65 && a >= 50) return image5;
    else if (a < 75 && a >= 65) return image10;
    else if (a < 85 && a >= 75) return devkaImage;
    else if (a < 93 && a >= 85) return negrImage;
    else if (a < 100 && a >= 93) return johnImage;
  });
}

const images = [
  image1,
  image2,
  image5,
  image10,
  devkaImage,
  johnImage,
  negrImage,
];

let lenta = [
  {
    id: 1,
    images: createImagesArray(),
  },
  {
    id: 2,
    images: createImagesArray(),
  },
  {
    id: 3,
    images: createImagesArray(),
  },
];

export default function SlotPage() {
  const [gameState, setGameState] = React.useState([]);
  const [playAnimation, setPlayAnimation] = React.useState(false);
  const [winPrice, setWinPrice] = React.useState(0);
  const [isWin, setIsWin] = React.useState(false);
  const [balance, setBalance] = React.useState(300);
  const [bet, setBet] = React.useState(0.5);
  const [isPressed, setIsPressed] = React.useState(false);

  React.useEffect(() => {
    let initialImages = new Array(3).fill({ value: images[0] });
    initialImages = initialImages.map((el, index) => {
      if (index === 1)
        return {
          value: image2,
        };
      return el;
    });
    setGameState(initialImages);
  }, []);

  React.useEffect(() => {
    if (gameState.length < 3 || gameState[0].value === "") return;
    if (
      gameState[0].value === gameState[1].value &&
      gameState[0].value === gameState[2].value
    ) {
      if (gameState[0].value === image1) {
        setWinPrice(bet * 1);
        setBalance((b) => b + bet * 1);
      } else if (gameState[0].value === image2) {
        setWinPrice(bet * 2);
        setBalance((b) => b + bet * 2);
      } else if (gameState[0].value === image5) {
        setWinPrice(bet * 5);
        setBalance((b) => b + bet * 5);
      } else if (gameState[0].value === image10) {
        setWinPrice(bet * 10);
        setBalance((b) => b + bet * 10);
      } else {
        alert("Бонуска!");
      }
      setIsWin(true);
    }
  }, [gameState]);

  const handleCanselWin = () => {
    if (isWin === true) setIsWin(false);
  };

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
    setIsPressed(true);

    setBalance(balance - bet);
    const newGameState = lenta.map((el) => ({
      value: el.images[6],
    }));

    setPlayAnimation(true);
    const emptyGameState = gameState.map(() => ({ value: "" }));
    setGameState(emptyGameState);

    setTimeout(() => {
      setPlayAnimation(false);
      setGameState(newGameState);
      const newLenta = lenta.map((el, index) => {
        return {
          id: el.id,
          images: createImagesArray(),
        };
      });
      lenta = newLenta;
      setIsPressed(false);
    }, 3000);
  };

  return (
    <div className="slot-container" onClick={handleCanselWin}>
      <RenderSlotLines
        gameState={gameState}
        lenta={lenta}
        playAnimation={playAnimation}
        isWin={isWin}
        winPrice={winPrice}
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
          <button
            className="spin-button"
            disabled={isPressed}
            onClick={handleSpinButton}
          >
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
