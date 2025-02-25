import s from "../slot-lines.module.scss";

type EndBonusProps = {
	bonusWin: number;
	handleEndBonus: () => void;
};

const EndBonus: React.FC<EndBonusProps> = ({ bonusWin, handleEndBonus }) => {
	return (
		<div className={s.lines__overlay}>
			<div className={s["lines__background-image"]}>
				<div className={s.lines__bonus}>
					<span>Вы выиграли {bonusWin}$ за эту бонусную игру!</span>
					<div className={s["lines__bonus-image"]}>
						<span>Ваша бонусная картинка:</span>
						<img src="/line-images/jackpot.png"></img>
					</div>
					<button
						className={s["lines__bonus-button"]}
						onClick={handleEndBonus}
					>
						Закончить бонуску
					</button>
				</div>
			</div>
		</div>
	);
};

export default EndBonus;
