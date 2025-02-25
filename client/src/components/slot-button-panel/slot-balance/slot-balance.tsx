import s from "../slot-button-panel.module.scss";

const SlotBalance: React.FC<{ balance: number }> = ({ balance }) => {
	return (
		<div className={s.panel__balance}>
			<p>Your balance</p>
			<span className={s.panel__cash}>{balance}$</span>
		</div>
	);
};

export default SlotBalance;
