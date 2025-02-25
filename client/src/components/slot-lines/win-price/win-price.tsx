import s from "../slot-lines.module.scss";

const WinPrice: React.FC<{ winPrice: number }> = ({ winPrice }) => {
	return (
		<div className={s.lines__overlay}>
			<div className={s["lines__background-image"]}>
				<div className={s.lines__win}>
					<span className={s["lines__win-price"]}>
						Ваш выигрыш: {winPrice}$
					</span>
				</div>
			</div>
		</div>
	);
};

export default WinPrice;
