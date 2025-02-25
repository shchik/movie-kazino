import React, { SetStateAction } from "react";
import { CSSTransition } from "react-transition-group";
import { TImages, TLenta } from "../../types/types";
import EndBonus from "./end-bonus/end-bonus";
import Lenta from "./lenta/lenta";
import s from "./slot-lines.module.scss";
import StartBonus from "./start-bonus/start-bonus";
import WinPrice from "./win-price/win-price";

type SlotLinesProps = {
	gameState: TImages[];
	lenta: TLenta[];
	playAnimation: boolean;
	isWin: boolean;
	winPrice: number;
	isBonusGame: boolean;
	bonusSpins: number;
	bonusDocs: boolean;
	setBonusDocs: React.Dispatch<SetStateAction<boolean>>;
	bonusImage: string | undefined;
	isBonusEnd: boolean;
	setIsBonusEnd: React.Dispatch<SetStateAction<boolean>>;
	bonusWin: number;
};

const SlotLines: React.FC<SlotLinesProps> = ({
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
	const handleBonusDocs = (): void => {
		setBonusDocs(false);
	};
	const handleEndBonus = (): void => {
		setIsBonusEnd(false);
	};

	return (
		<div className={s.lines}>
			{isBonusEnd ? (
				<EndBonus handleEndBonus={handleEndBonus} bonusWin={bonusWin} />
			) : (
				""
			)}

			{bonusDocs ? (
				<StartBonus
					bonusImage={bonusImage ? bonusImage : "unluck"}
					handleBonusDocs={handleBonusDocs}
				/>
			) : (
				""
			)}
			{isWin ? <WinPrice winPrice={winPrice} /> : ""}

			{isBonusGame ? (
				<div className={s["lines__bonus-game"]}>
					<span>Количество бонусных вращений: {bonusSpins}</span>
				</div>
			) : (
				""
			)}

			{gameState.map((el, index) => {
				const nodeRef = React.useRef<HTMLDivElement | null>(null);

				return (
					<div className={s.lines__window} key={index}>
						<CSSTransition
							nodeRef={nodeRef}
							in={playAnimation}
							timeout={3000}
							classNames="my-node"
						>
							<Lenta
								nodeRef={nodeRef}
								lenta={lenta}
								index={index}
							/>
						</CSSTransition>

						{playAnimation ? (
							<img
								key={index}
								src={el.image}
								className={`${s["lines__lenta-image"]} ${s["lines--active-animation"]}`}
								alt="Hello"
							/>
						) : (
							<img
								key={index}
								src={el.image}
								className={s["lines__lenta-image"]}
								alt="Hello"
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default SlotLines;
