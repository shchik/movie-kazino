import s from "../slot-lines.module.scss";

type StartBonusProps = {
	handleBonusDocs: () => void;
	bonusImage: string;
};

const StartBonus: React.FC<StartBonusProps> = ({
	handleBonusDocs,
	bonusImage,
}) => {
	return (
		<div className={s.lines__overlay}>
			<div className={s["lines__background-bonus-image"]}>
				<div className={s.lines__bonus}>
					<span>
						Вы выиграли бонусную игру! Вам даётся 10 бесплатных
						спинов с бонусами!
					</span>
					<div className={s["lines__bonus-image"]}>
						<span>Ваша бонусная картинка:</span>
						<img src={bonusImage}></img>
					</div>
					<button
						className={s["lines__bonus-button"]}
						onClick={handleBonusDocs}
					>
						Начать бонуску
					</button>
				</div>
			</div>
		</div>
	);
};

export default StartBonus;
