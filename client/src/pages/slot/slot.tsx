import React from "react";
import { Link } from "react-router-dom";
import RenderSlotLines from "../../components/renderSlotLines/renderSlotLines.js";
import SlotPanel from "../../components/slotPanelComponent/slotPanel.js";
import { context } from "../../context.js";
import { TImages, TLenta } from "../../types/types.js";
import { NotFoundPage } from "../not-found/not-found.js";
import image1 from "./images/1.png";
import image10 from "./images/10.png";
import image2 from "./images/2.png";
import image5 from "./images/5.png";
import devkaImage from "./images/devka.jpg";
import johnImage from "./images/john.jfif";
import negrImage from "./images/negr.jpg";
import s from "./slot.module.scss";

const images: TImages[] = [
	{
		image: image1,
		value: 1,
	},
	{
		image: image2,
		value: 2,
	},
	{
		image: image5,
		value: 5,
	},
	{
		image: image10,
		value: 10,
	},
	{
		image: devkaImage,
		value: 2,
	},
	{
		image: johnImage,
		value: 4,
	},
	{
		image: negrImage,
		value: 8,
	},
];

function createImagesArray(): (TImages | undefined)[] {
	return images.map(() => {
		let a: number = Math.random() * 100;
		//if (a < 1000) return { image: devkaImage, value: 5 };
		if (a < 30) return images[0];
		//else if (a < 80 && a >= 30) return { image: devkaImage, value: 2 };
		else if (a < 50 && a >= 30) return images[1];
		else if (a < 65 && a >= 50) return images[2];
		else if (a < 75 && a >= 65) return images[3];
		else if (a < 85 && a >= 75) return images[4];
		else if (a < 93 && a >= 85) return images[5];
		else if (a < 100 && a >= 93) return images[6];
	});
}

let intervalId: number;

let lenta: TLenta[] = [
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

const SlotPage: React.FC = () => {
	const contextValue = React.useContext(context);

	const [gameState, setGameState] = React.useState<TImages[]>([]);
	const [playAnimation, setPlayAnimation] = React.useState(false);
	const [winPrice, setWinPrice] = React.useState(0);
	const [isWin, setIsWin] = React.useState(false);
	const [balance, setBalance] = React.useState(300);
	const [bet, setBet] = React.useState(0.5);
	const [isPressed, setIsPressed] = React.useState(false);
	const [isSpinning, setIsSpinning] = React.useState(false);
	const [isBonusGame, setIsBonusGame] = React.useState(false);
	const [bonusSpins, setBonusSpins] = React.useState(0);
	const [bonusImage, setBonusImage] = React.useState<string | undefined>(
		undefined
	);
	const [bonusDocs, setBonusDocs] = React.useState(false);
	const [bonusWin, setBonusWin] = React.useState(0);
	const [isBonusEnd, setIsBonusEnd] = React.useState(false);

	React.useEffect(() => {
		let initialImages: TImages[] = new Array(3).fill(images[0]);
		initialImages = initialImages.map((el, index) => {
			if (index === 1) return images[1];
			return el;
		});
		setGameState(initialImages);
	}, []);

	React.useEffect(() => {
		if (isBonusGame) {
			calculateWin();
			gameState.map(state => {
				if (state.image === bonusImage) {
					setWinPrice(
						bet *
							gameState[0].value *
							gameState[1].value *
							gameState[2].value
					);
					setBalance(
						b =>
							b +
							bet *
								gameState[0].value *
								gameState[1].value *
								gameState[2].value
					);
					setIsWin(true);
				}
			});
		} else {
			if (gameState.length < 3 || gameState[0].image === "") return;
			calculateWin();
		}
	}, [gameState]);

	const calculateWin = (): void => {
		if (
			gameState[0].image === gameState[1].image &&
			gameState[0].image === gameState[2].image
		) {
			if (gameState[0].image === image1) {
				setWinPrice(bet * gameState[0].value);
				setBalance(b => b + bet * gameState[0].value);
				setIsWin(true);
			} else if (gameState[0].image === image2) {
				setWinPrice(bet * gameState[0].value);
				setBalance(b => b + bet * gameState[0].value);
				setIsWin(true);
			} else if (gameState[0].image === image5) {
				setWinPrice(bet * gameState[0].value);
				setBalance(b => b + bet * gameState[0].value);
				setIsWin(true);
			} else if (gameState[0].image === image10) {
				setWinPrice(bet * gameState[0].value);
				setBalance(b => b + bet * gameState[0].value);
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

	const spinningSlot = (): void => {
		if (isBonusGame) {
			setBonusSpins(bonusSpins - 1);
			setIsPressed(true);
			const newGameState: TImages[] = lenta.map(el => ({
				image: el.images[6]!.image,
				value: el.images[6]!.value,
			}));

			setPlayAnimation(true);
			const emptyGameState = gameState.map(() => ({
				image: "",
				value: 0,
			}));
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

			setBalance(prevBalance => {
				const newBalance = prevBalance - bet;
				return newBalance;
			});
			const newGameState = lenta.map(el => ({
				image: el.images[6]!.image,
				value: el.images[6]!.value,
			}));

			setPlayAnimation(true);
			const emptyGameState = gameState.map(() => ({
				image: "",
				value: 0,
			}));
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

	const handleCanselWin = (): void => {
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

	const handleAutoSpinButton = (): void => {
		if (isSpinning) {
			clearInterval(intervalId);
			setIsSpinning(false);
		} else {
			setIsSpinning(true);
			if (!isPressed) spinningSlot();
			intervalId = setInterval(() => {
				spinningSlot();
				if (balance < bet) {
					clearInterval(intervalId);
					setIsSpinning(false);
				}
			}, 4000);
		}
	};
	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		e.preventDefault();
		if (e.keyCode === 32 && !isPressed) {
			spinningSlot();
		}
	};

	return (
		<>
			{contextValue.isAuth ? (
				<div className={s.slot} onClick={handleCanselWin}>
					<button>
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
						handleKeyPress={handleKeyPress}
						isSpinning={isSpinning}
					/>
				</div>
			) : (
				<NotFoundPage />
			)}
		</>
	);
};

export default SlotPage;
