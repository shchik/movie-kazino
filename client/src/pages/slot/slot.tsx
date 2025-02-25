import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import SlotButtonPanel from "../../components/slot-button-panel/slot-button-panel.js";
import SlotLines from "../../components/slot-lines/slot-lines.js";
import { useImages } from "../../hooks/useImages.js";
import { TImages, TLenta } from "../../types/types.js";
import s from "./slot.module.scss";

function createImagesArray(images: TImages[]): (TImages | undefined)[] {
	return images.map(() => {
		let a: number = Math.random() * 100;
		if (a < 17) return images[0];
		else if (a < 34 && a >= 17) return images[1];
		else if (a < 51 && a >= 34) return images[2];
		else if (a < 67 && a >= 51) return images[3];
		else if (a < 85 && a >= 67) return images[4];
		else if (a < 100 && a >= 85) return images[5];
	});
}

let intervalId: number;

const SlotPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const id = searchParams.get("id");
	const { images, isLoading } = useImages(parseInt(id!));

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
	const [lenta, setLenta] = React.useState<TLenta[]>([]);

	React.useEffect(() => {
		if (!isLoading && images.length > 0) {
			let initialImages: TImages[] = new Array(3).fill(images[0]);
			initialImages = initialImages.map((el, index) => {
				if (index === 1) return images[1];
				return el;
			});
			setGameState(initialImages);

			setLenta([
				{
					id: 1,
					images: createImagesArray(images),
				},
				{
					id: 2,
					images: createImagesArray(images),
				},
				{
					id: 3,
					images: createImagesArray(images),
				},
			]);
		}
	}, [isLoading, images]);

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
			if (gameState[0].image === images[0].image) {
				setWinPrice(bet * gameState[0].value);
				setBalance(b => b + bet * gameState[0].value);
				setIsWin(true);
			} else if (gameState[0].image === images[1].image) {
				setWinPrice(bet * gameState[0].value);
				setBalance(b => b + bet * gameState[0].value);
				setIsWin(true);
			} else if (gameState[0].image === images[2].image) {
				setWinPrice(bet * gameState[0].value);
				setBalance(b => b + bet * gameState[0].value);
				setIsWin(true);
			} else if (
				(gameState[0].image === images[3].image ||
					gameState[0].image === images[4].image ||
					gameState[0].image === images[5].image) &&
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
				image: el.images[images.length - 1]!.image,
				value: el.images[images.length - 1]!.value,
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
				const newLenta = lenta.map(el => ({
					id: el.id,
					images: createImagesArray(images),
				}));

				setLenta(newLenta);
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
				image: el.images[images.length - 1]!.image,
				value: el.images[images.length - 1]!.value,
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
						images: createImagesArray(images),
					};
				});
				setLenta(newLenta);
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

	const handleAutoSpin = (): void => {
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
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className={s.slot} onClick={handleCanselWin}>
					<button className={s["slot__close-button"]}>
						<Link to="/">X</Link>
					</button>
					<SlotLines
						gameState={gameState}
						lenta={lenta!}
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
					<SlotButtonPanel
						handleAutoSpin={handleAutoSpin}
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
			)}
		</>
	);
};

export default SlotPage;
