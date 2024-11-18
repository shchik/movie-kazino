import "./slotPage.css";
import RenderSlotLines from "../../components/renderSlotLines/renderSlotLines.jsx";
import image1 from "./images/1.png";
import image2 from "./images/2.png";
import image5 from "./images/5.png";
import image10 from "./images/10.png";
import devkaImage from "./images/devka.jpg";
import johnImage from "./images/john.jfif";
import negrImage from "./images/negr.jpg";
import React from "react";
import { Link } from "react-router-dom";
import SlotPanel from "../../components/slotPanelComponent/slotPanel.jsx";
import { context } from "../../context.js";
import { NotFoundPage } from "../notFoundPage/notFoundPage.jsx";

let intervalId;

function createImagesArray() {
  return images.map(() => {
    let a = Math.random() * 100;
    //if (a < 1000) return { image: devkaImage, value: 5 };
    if (a < 30) return { image: image1, value: 1 };
    //else if (a < 80 && a >= 30) return { image: devkaImage, value: 2 };
    else if (a < 50 && a >= 30) return { image: image2, value: 2 };
    else if (a < 65 && a >= 50) return { image: image5, value: 5 };
    else if (a < 75 && a >= 65) return { image: image10, value: 10 };
    else if (a < 85 && a >= 75) return { image: devkaImage, value: 2 };
    else if (a < 93 && a >= 85) return { image: negrImage, value: 4 };
    else if (a < 100 && a >= 93) return { image: johnImage, value: 8 };
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
  const contextValue = React.useContext(context);

  const [gameState, setGameState] = React.useState([]);
  const [playAnimation, setPlayAnimation] = React.useState(false);
  const [winPrice, setWinPrice] = React.useState(0);
  const [isWin, setIsWin] = React.useState(false);
  const [balance, setBalance] = React.useState(300);
  const [bet, setBet] = React.useState(0.5);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [isBonusGame, setIsBonusGame] = React.useState(false);
  const [bonusSpins, setBonusSpins] = React.useState(0);
  const [bonusImage, setBonusImage] = React.useState(null);
  const [bonusDocs, setBonusDocs] = React.useState(false);
  const [bonusWin, setBonusWin] = React.useState(0);
  const [isBonusEnd, setIsBonusEnd] = React.useState(false);

  React.useEffect(() => {
    let initialImages = new Array(3).fill({ image: images[0], value: 1 });
    initialImages = initialImages.map((el, index) => {
      if (index === 1)
        return {
          image: image2,
          value: 2,
        };
      return el;
    });
    setGameState(initialImages);
  }, []);

  React.useEffect(() => {
    if (isBonusGame) {
      calculateWin();
      gameState.map((state) => {
        if (state.image === bonusImage) {
          setWinPrice(
            bet * gameState[0].value * gameState[1].value * gameState[2].value
          );
          setBalance(
            (b) =>
              b +
              bet * gameState[0].value * gameState[1].value * gameState[2].value
          );
          setIsWin(true);
        }
      });
    } else {
      if (gameState.length < 3 || gameState[0].image === "") return;
      calculateWin();
    }
  }, [gameState]);

  const calculateWin = () => {
    if (
      gameState[0].image === gameState[1].image &&
      gameState[0].image === gameState[2].image
    ) {
      if (gameState[0].image === image1) {
        setWinPrice(bet * gameState[0].value);
        setBalance((b) => b + bet * gameState[0].value);
        setIsWin(true);
      } else if (gameState[0].image === image2) {
        setWinPrice(bet * gameState[0].value);
        setBalance((b) => b + bet * gameState[0].value);
        setIsWin(true);
      } else if (gameState[0].image === image5) {
        setWinPrice(bet * gameState[0].value);
        setBalance((b) => b + bet * gameState[0].value);
        setIsWin(true);
      } else if (gameState[0].image === image10) {
        setWinPrice(bet * gameState[0].value);
        setBalance((b) => b + bet * gameState[0].value);
        setIsWin(true);
      } else if (
        (gameState[0].image === devkaImage ||
          gameState[0].image === negrImage ||
          gameState[0].image === johnImage) &&
        !isBonusGame
      ) {
        setBonusWin(balance);
        setBonusDocs(true);
        setIsBonusGame(true);
        setBonusImage(gameState[0].image);
        setBonusSpins(bonusSpins + 10);
      }
    }
  };

  const spinningSlot = () => {
    if (isBonusGame) {
      setBonusSpins(bonusSpins - 1);
      setIsPressed(true);
      const newGameState = lenta.map((el) => ({
        image: el.images[6].image,
        value: el.images[6].value,
      }));

      setPlayAnimation(true);
      const emptyGameState = gameState.map(() => ({ image: "", value: 0 }));
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
      if (bonusSpins === 1) {
        setTimeout(() => {
          setIsBonusGame(false);
          setBonusWin(balance - bonusWin);
          setIsBonusEnd(true);
        }, 4000);
      }
    } else {
      if (balance < bet) return;
      setIsPressed(true);

      setBalance((prevBalance) => {
        const newBalance = prevBalance - bet;
        return newBalance;
      });
      const newGameState = lenta.map((el) => ({
        image: el.images[6].image,
        value: el.images[6].value,
      }));

      setPlayAnimation(true);
      const emptyGameState = gameState.map(() => ({ image: "", value: 0 }));
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
    }
  };

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
    spinningSlot();
  };

  const handleAutoSpinButton = () => {
    if (isSpinning) {
      clearInterval(intervalId);
      setIsSpinning(false);
    } else {
      setIsSpinning(true);
      spinningSlot();
      intervalId = setInterval(() => {
        spinningSlot();
        if (balance < bet) {
          clearInterval(intervalId);
          setIsSpinning(false);
        }
      }, 4000);
    }
  };

  React.useEffect(() => {
    console.log(isSpinning);
  }, [isSpinning]);

  return (
    <>
      {contextValue.isAuth ? (
        <div className="slot-container" onClick={handleCanselWin}>
          <button className="close-button">
            <Link to="/">X</Link>
          </button>
          <RenderSlotLines
            gameState={gameState}
            lenta={lenta}
            playAnimation={playAnimation}
            isWin={isWin}
            winPrice={winPrice}
            isBonusGame={isBonusGame}
            bonusSpins={bonusSpins}
            bonusDocs={bonusDocs}
            setBonusDocs={setBonusDocs}
            bonusImage={bonusImage}
            isBonusEnd={isBonusEnd}
            setIsBonusEnd={setIsBonusEnd}
            bonusWin={bonusWin}
          />
          <SlotPanel
            handleAutoSpinButton={handleAutoSpinButton}
            handleMaxButton={handleMaxButton}
            isPressed={isPressed}
            handleSpinButton={handleSpinButton}
            bet={bet}
            handleLessButton={handleLessButton}
            handleMoreButton={handleMoreButton}
            balance={balance}
          />
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
