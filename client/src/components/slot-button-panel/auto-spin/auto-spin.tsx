import s from "../slot-button-panel.module.scss";

type AutoSpinProps = {
	handleAutoSpin: () => void;
	isSpinning: boolean;
};

const AutoSpin: React.FC<AutoSpinProps> = ({ handleAutoSpin, isSpinning }) => {
	return (
		<div className={s["panel__auto-spin"]}>
			<button onClick={handleAutoSpin}>
				{isSpinning ? "Stop-spinning" : "Auto-Spin"}
			</button>
		</div>
	);
};

export default AutoSpin;
