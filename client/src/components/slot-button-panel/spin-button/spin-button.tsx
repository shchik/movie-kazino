import s from "../slot-button-panel.module.scss";

type SpinButton = {
	isPressed: boolean;
	handleSpinButton: () => void;
};

const SpinButton: React.FC<SpinButton> = ({ isPressed, handleSpinButton }) => {
	return (
		<div className={s.panel__spin}>
			<button disabled={isPressed} onClick={handleSpinButton}>
				<img src="/spin.png"></img>
			</button>
		</div>
	);
};

export default SpinButton;
