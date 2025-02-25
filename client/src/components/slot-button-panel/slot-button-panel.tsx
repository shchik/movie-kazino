import AutoSpin from "./auto-spin/auto-spin";
import MaxBet from "./max-bet/max-bet";
import SlotBalance from "./slot-balance/slot-balance";
import SlotBet from "./slot-bet/slot-bet";
import s from "./slot-button-panel.module.scss";
import SpinButton from "./spin-button/spin-button";

type SlotButtonPanelProps = {
	handleAutoSpin: () => void;
	handleMaxButton: () => void;
	isPressed: boolean;
	handleSpinButton: () => void;
	bet: number;
	handleLessButton: () => void;
	handleMoreButton: () => void;
	balance: number;
	handleKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	isSpinning: boolean;
};

const SlotButtonPanel: React.FC<SlotButtonPanelProps> = ({
	handleAutoSpin,
	handleMaxButton,
	isPressed,
	handleSpinButton,
	bet,
	handleLessButton,
	handleMoreButton,
	balance,
	handleKeyPress,
	isSpinning,
}) => {
	return (
		<div
			className={s.panel}
			onKeyDown={e => handleKeyPress(e)}
			tabIndex={0}
		>
			<AutoSpin handleAutoSpin={handleAutoSpin} isSpinning={isSpinning} />
			<MaxBet handleMaxButton={handleMaxButton} />
			<SpinButton
				handleSpinButton={handleSpinButton}
				isPressed={isPressed}
			/>
			<SlotBet
				bet={bet}
				handleMoreButton={handleMoreButton}
				handleLessButton={handleLessButton}
			/>
			<SlotBalance balance={balance} />
		</div>
	);
};

export default SlotButtonPanel;
