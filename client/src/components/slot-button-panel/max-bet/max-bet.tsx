import s from "../slot-button-panel.module.scss";

const MaxBet: React.FC<{ handleMaxButton: () => void }> = ({
	handleMaxButton,
}) => {
	return (
		<div className={s["panel__max-bet"]}>
			<button onClick={handleMaxButton}>MaxBet</button>
		</div>
	);
};

export default MaxBet;
