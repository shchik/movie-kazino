import s from "../slot-button-panel.module.scss";

const greaterThan: string = ">";
const lessThan: string = "<";

type SlotBetProps = {
	bet: number;
	handleMoreButton: () => void;
	handleLessButton: () => void;
};

const SlotBet: React.FC<SlotBetProps> = ({
	bet,
	handleMoreButton,
	handleLessButton,
}) => {
	return (
		<div className={s.panel__bet}>
			<p className={s["panel__bet-amount"]}>Bet: {bet}$</p>
			<div className={s["panel__bet-buttons"]}>
				<button className="less-than" onClick={handleLessButton}>
					{lessThan}
				</button>
				<button className="more-than" onClick={handleMoreButton}>
					{greaterThan}
				</button>
			</div>
		</div>
	);
};

export default SlotBet;
